import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { WikiImage, WikiSummaryResponse } from './my-element.types';
import {
	getAvailableLangByPageId,
	getAvailableLangByTitle,
	getContentUrlByTitle,
	getSummaryByUrl,
	getTitlesAndLangsByQid,
} from './utils/api';
import { currentLanguage } from './utils/language';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
	@property()
	searchValue = '';

	@property()
	title = '';

	@property()
	description = 'enter QId or a wikipedia page url';

	@property({ type: Object })
	thumbnail: WikiImage = { source: '', height: 0, width: 0 };

	render() {
		/*
			TODO: ask client if they want the styling of wikipedia.
			${html`${unsafeHTML(this.description)}`}
		*/

		return html`
			<input @change=${(e: any) => (this.searchValue = e.target.value)} />
			<button @click=${this.fetchWiki} part="button">fetch</button>
			<h1>${this.title}</h1>
			<p>${this.description}</p>
			${this.thumbnail.source
				? html`
						<img
							src="${this.thumbnail.source}"
							alt="photo of ${this.title}"
							width="${this.thumbnail.width}"
							height="${this.thumbnail.height}" />
				  `
				: ''}
			<slot></slot>
		`;
	}

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
		const urlRegex = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org\/wiki\/([a-zA-Z]+_?[a-zA-Z]+)/;
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
			return;
		}

		this.description = summary.extract;
		this.title = summary.title;
		this.thumbnail = summary.thumbnail;
	}

	// eslint-disable-next-line @typescript-eslint/member-ordering
	static styles = css`
		:host {
			display: block;
			padding: 16px;
			max-width: 800px;
		}
	`;
}

declare global {
	interface HTMLElementTagNameMap {
		'my-element': MyElement;
	}
}
