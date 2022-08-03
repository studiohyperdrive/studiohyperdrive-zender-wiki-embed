/* eslint-disable @typescript-eslint/member-ordering */
import '../index';
import { html, LitElement } from 'lit';
// import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';

import {
	getAvailableLangByPageId,
	getAvailableLangByTitle,
	getContentUrlByTitle,
	getSummaryByUrl,
	getTitlesAndLangsByQid,
} from '../utils/api';
import { currentLanguage } from '../utils/language';
import { MyElementStyle } from './my-element.style';
import { WikiImage, WikiSummaryResponse } from './my-element.types';

@customElement('my-element')
export class MyElement extends LitElement {
	@property()
	searchValue = '';

	@property()
	title = '';
	@property()
	description = 'enter QId or a wikipedia page url';
	@property({ type: Object })
	thumbnail: WikiImage | undefined = { source: '', height: 0, width: 0 };
	@property()
	imgPosition = 'img-left';
	@property()
	pageSource = '';

	radioGroup = [
		{
			id: 'img-left',
			label: 'on the left',
		},
		{
			id: 'img-right',
			label: 'on the right',
		},
		{
			id: 'img-bottom',
			label: 'under text',
		},
		{
			id: 'no-img',
			label: 'hide image',
		},
	];

	private async getWikiByPageIdUrl(url: string, pageId: string) {
		// Checks if string is a valid wikipedia url.Example https://en.wikipedia.org
		const regex = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org/i;
		const [, , , languageCode] = url.match(regex) || [];
		const infoBypageId = await getAvailableLangByPageId(pageId, languageCode);

		if (languageCode === currentLanguage) {
			const urlByPageId = getContentUrlByTitle(infoBypageId.title, languageCode);

			return urlByPageId;
		}

		const langLinkCurrLang = infoBypageId.langlinks.find(({ lang }) => lang === currentLanguage);
		const urlByPageId = getContentUrlByTitle(langLinkCurrLang?.['*'], langLinkCurrLang?.lang);

		return urlByPageId;
	}

	private async getWikiByTitleUrl(url: string) {
		// Checks if string is a valid wikipedia article url with title. Example: https://en.wikipedia.org/wiki/Universe
		const urlRegex = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org\/wiki\/([^/]+)/;
		const [, , , languageCode, title] = url.match(urlRegex) || [];

		if (languageCode === currentLanguage) {
			const wikiUrl = getContentUrlByTitle(title, languageCode);

			return wikiUrl;
		}

		const langLinks = await getAvailableLangByTitle(title, languageCode);
		const langLinkCurrLang = langLinks.find(({ code }) => code === currentLanguage);
		const wikiUrl = getContentUrlByTitle(langLinkCurrLang?.title, langLinkCurrLang?.code);

		return wikiUrl;
	}

	private async getWikiByurl(url: string) {
		const pageId = new URL(url).searchParams.get('curid');

		if (pageId) {
			const summaryUrl = this.getWikiByPageIdUrl(url, pageId);

			return summaryUrl;
		}

		const summaryUrl = this.getWikiByTitleUrl(url);

		return summaryUrl;
	}

	private async getWikiByQid(wikiId: string) {
		const titlesByLang = await getTitlesAndLangsByQid(wikiId);

		const titleInCurrLang = titlesByLang?.[`${currentLanguage}wiki`] || titlesByLang?.['enwiki'];
		const languageCode = titleInCurrLang.site.slice(0, 2);

		const wikiUrl = getContentUrlByTitle(titleInCurrLang?.title, languageCode);

		return wikiUrl;
	}

	private async fetchWiki() {
		// Checks if search value is a Q ID. Example: Q44077
		const searchRegex = /^q[0-9]+$/i;

		let summary: WikiSummaryResponse | null = null;
		let summaryUrl;

		if (this.searchValue.match(searchRegex)) {
			summaryUrl = await this.getWikiByQid(this.searchValue);
		} else {
			summaryUrl = await this.getWikiByurl(this.searchValue);
		}

		summary = await getSummaryByUrl(summaryUrl);

		if (!summary) {
			this.title = '';
			this.description = '';
			this.thumbnail = { source: '', height: 0, width: 0 };
			this.pageSource = '';

			return;
		}

		this.description = summary.extract;
		this.title = summary.title;
		this.thumbnail = summary?.thumbnail;
		this.pageSource = summary.content_urls.desktop.page;
		this.imgPosition = summary.thumbnail ? this.imgPosition : 'no-img';
	}

	private handleInputChange(event: { target: HTMLInputElement }) {
		this.searchValue = event.target.value;
	}

	private handleRadioBtnChange(event: { target: HTMLInputElement }) {
		const position = event.target.value ?? 'no-img';

		this.imgPosition = position;
	}

	static styles = MyElementStyle;

	private renderImgPositionSetting() {
		return html`
			<div>
				${this.thumbnail?.source
					? html`
							<p style="margin-bottom:0">Where should the image be positioned?</p>
							${this.radioGroup.map(
								(item) =>
									html`<input
											id=${item.id}
											type="radio"
											name="img_position"
											value=${item.id}
											@change=${this.handleRadioBtnChange}
											?checked=${this.imgPosition === item.id} />
										<label for="${item.id}">${item.label}</label><br />`,
							)}
					  `
					: html`<p style="margin-bottom:0">No image availabe</p>`}
			</div>
		`;
	}

	render() {
		/*
			TODO: ask client if they want the styling of wikipedia.
			${html`${unsafeHTML(this.description)}`}
		*/
		return html`
			<div class="wiki-input">
				<input @change=${this.handleInputChange} />
				<button @click=${this.fetchWiki} part="button">fetch</button>

				${this.renderImgPositionSetting()}
			</div>

			<div class="container ${this.imgPosition}">
				<div class="content">
					<h1 class="content-title">${this.title}</h1>
					<p>${this.description}</p>
				</div>

				${this.thumbnail?.source && this.imgPosition !== 'no-img'
					? html`
							<div class="thumbnail">
								<img
									src="${this.thumbnail.source}"
									alt="photo of ${this.title}"
									width="${this.thumbnail.width}"
									height="${this.thumbnail.height}" />
							</div>
					  `
					: ''}

				<div class="read-more">
					${this.pageSource ? html`<p>Read more: <a href="${this.pageSource}">${this.pageSource}</a></p>` : ''}
				</div>
			</div>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'my-element': MyElement;
	}
}
