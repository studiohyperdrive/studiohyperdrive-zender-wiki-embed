/* eslint-disable @typescript-eslint/member-ordering */
import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../utils/index';
import {
	getAvailableLangByPageId,
	getAvailableLangByTitle,
	getContentUrlByTitle,
	getSummaryByUrl,
	getTitlesAndLangsByQid,
} from '../utils/api';
import { debounceLeading, removeFocus, stringToUrl } from '../utils/helpers';
import { currentLanguage, translatedContent } from '../utils/language';
import { MyElementStyle } from './my-element.style';
import { WikiImage, WikiSummaryResponse } from './my-element.types';

@customElement('my-element')
export class MyElement extends LitElement {
	//#region VARIABLES
	@property({
		type: Boolean,
	})
	isConfigMode = false;

	@property()
	searchValue = '';

	@property()
	qId = '';
	@property()
	outputSource = '';
	@property({ type: Boolean })
	showCodeCopiedFeedback = false;

	@property()
	title = '';
	@property()
	description = '';
	@property({ type: Object })
	thumbnail: WikiImage | undefined = { source: '', height: 0, width: 0 };
	@property()
	imgPosition = 'img-left';
	@property()
	pageSource = '';
	@property()
	errorMessage = '';

	content = currentLanguage === 'nl' ? translatedContent.nl : translatedContent.en;

	radioGroup = [
		{
			id: 'img-left',
			label: this.content.imgPosition.optionLeft,
		},
		{
			id: 'img-right',
			label: this.content.imgPosition.optionRight,
		},
		{
			id: 'img-bottom',
			label: this.content.imgPosition.optionBottom,
		},
		{
			id: 'no-img',
			label: this.content.imgPosition.optionNoImg,
		},
	];

	//#endregion VARIABLES

	//#region LIFECYCLE METHODS
	updated(changedProperties: PropertyValues) {
		// Prevent fetching multiple times.
		if (!this.isConfigMode && changedProperties.has('isConfigMode')) {
			this.fetchWiki();
		}

		if (!changedProperties.has('outputSource') && !changedProperties.has('searchValue')) {
			this.generateOutputCode();
		}
	}
	//#endregion LIFECYCLE METHODS

	//#region UTILS
	async getWikiByPageIdUrl(url: string, pageId: string) {
		// Checks if string is a valid wikipedia url.Example https://en.wikipedia.org
		const regex = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org/i;
		const [, , , languageCode] = url.match(regex) || [];
		const infoBypageId = await getAvailableLangByPageId(pageId, languageCode);

		if (!infoBypageId) {
			this.errorMessage = this.content.errors.invalid;
			return;
		}

		if (languageCode === currentLanguage) {
			const urlByPageId = getContentUrlByTitle(infoBypageId.title, languageCode);

			return urlByPageId;
		}

		const langLinkCurrLang = infoBypageId?.langlinks?.find(({ lang }) => lang === currentLanguage);

		let urlByPageId;
		if (!langLinkCurrLang) {
			this.errorMessage = this.content.errors.notSupported;
			urlByPageId = getContentUrlByTitle(infoBypageId.title, languageCode);
		} else {
			urlByPageId = getContentUrlByTitle(langLinkCurrLang?.['*'], langLinkCurrLang?.lang);
		}

		return urlByPageId;
	}

	async getWikiByTitleUrl(url: string) {
		// Checks if string is a valid wikipedia article url with title. Example: https://en.wikipedia.org/wiki/Universe
		const urlRegex = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org\/wiki\/([^/]+)/;
		const [, , , languageCode, title] = url.match(urlRegex) || [];

		if (languageCode === currentLanguage) {
			const wikiUrl = getContentUrlByTitle(title, languageCode);

			return wikiUrl;
		}

		const langLinks = await getAvailableLangByTitle(title, languageCode);

		if (!langLinks) {
			this.errorMessage = this.content.errors.invalid;
			return;
		}

		const langLinkCurrLang = langLinks.find(({ code }) => code === currentLanguage);

		let wikiUrl;
		if (!langLinkCurrLang) {
			wikiUrl = getContentUrlByTitle(title, languageCode);

			this.errorMessage = this.content.errors.notSupported;
		} else {
			wikiUrl = getContentUrlByTitle(langLinkCurrLang?.title, langLinkCurrLang?.code);
		}

		return wikiUrl;
	}

	async getWikiByurl(url: string) {
		const urlObject = stringToUrl(url);

		if (!urlObject) {
			this.errorMessage = this.content.errors.invalid;
			return;
		}

		const pageId = urlObject.searchParams.get('curid');

		if (pageId) {
			const summaryUrl = this.getWikiByPageIdUrl(url, pageId);

			return summaryUrl;
		}

		const summaryUrl = this.getWikiByTitleUrl(url);

		return summaryUrl;
	}

	async getWikiByQid(wikiId: string) {
		const titlesByLang = await getTitlesAndLangsByQid(wikiId);

		const titleInCurrLang =
			titlesByLang?.[`${currentLanguage}wiki`] || titlesByLang?.['enwiki'] || Object.values(titlesByLang ?? {})?.[0];

		if (!titleInCurrLang) {
			this.errorMessage = this.content.errors.invalid;
			return;
		}

		const languageCode = titleInCurrLang.site.slice(0, 2);
		const wikiUrl = getContentUrlByTitle(titleInCurrLang?.title, languageCode);
		return wikiUrl;
	}

	isInputValid(): boolean {
		// remove empty spaces
		this.searchValue = this.searchValue.replace(/ /g, '');

		if (this.searchValue.match(/^\s*$/)) {
			this.errorMessage = this.content.errors.invalid;
			return false;
		}

		this.errorMessage = '';
		return true;
	}

	async fetchWiki() {
		removeFocus();

		if (!this.isInputValid()) {
			return;
		}

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
			this.qId = '';

			return;
		}

		this.qId = summary.wikibase_item;
		this.description = summary.extract;
		this.title = summary.title;
		this.thumbnail = summary?.thumbnail;
		this.pageSource = summary.content_urls.desktop.page;
		this.imgPosition = summary.thumbnail ? this.imgPosition : 'no-img';
	}

	debouncedFetchWiki = debounceLeading(() => this.fetchWiki());

	handleInputChange(event: { target: HTMLInputElement }) {
		this.searchValue = event.target.value;
	}

	handleInputKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			this.debouncedFetchWiki();
		}
	}

	handleRadioBtnChange(event: { target: HTMLInputElement }) {
		const position = event.target.value ?? 'no-img';

		this.imgPosition = position;
	}

	generateOutputCode() {
		const code = {
			'data-my-wiki-el': '',
			searchvalue: this.qId,
			imgposition: this.imgPosition,
		};

		this.outputSource = `'${JSON.stringify(code, null, 2)}'`;
	}

	copyCodeToclipboard() {
		removeFocus();

		navigator.clipboard.writeText(this.outputSource);

		this.showCodeCopiedFeedback = true;
		setTimeout(() => (this.showCodeCopiedFeedback = false), 1500);
	}
	//#endregion UTILS

	//#region RENDER
	static styles = MyElementStyle;

	renderImgPositionSetting() {
		return html`
			<div>
				${this.thumbnail?.source
					? html`
							<p style="margin-bottom:0">${this.content.imgPosition.title}</p>
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
					: html`<p style="margin-bottom:0">${this.content.imgPosition.noImgAvailable}</p>`}
			</div>
		`;
	}

	renderCodeBlock() {
		return html`
			<h2>${this.content.code.title}:</h2>
			<div class="code-block">
				<code> ${this.outputSource} </code>
				${this.showCodeCopiedFeedback ? html`<span>${this.content.code.btnClickFeedback}</span>` : ''}
				<button class="btn btn-code-copy" @click=${this.copyCodeToclipboard}>${this.content.code.btnText}</button>
			</div>
		`;
	}

	renderConfigMode() {
		return html`
			<div class="wiki-config">
				<div class="wiki-input">
					<input
						class="search-input"
						placeholder="${this.content.search.inputPlaceholder}"
						tabindex="1"
						@input=${this.handleInputChange}
						@keypress=${this.handleInputKeyPress} />

					<button class="btn search-btn" @click=${this.debouncedFetchWiki} part="button" tabindex="2">
						${this.content.search.btnText}
					</button>
				</div>
				${this.errorMessage ? html`<p class="invalid-input-feedback">${this.errorMessage}</p>` : ''}
				<!-- eslint-disable-next-line prettier/prettier -->
				${this.qId ? this.renderImgPositionSetting() : ''}
			</div>

			${this.qId ? this.renderCodeBlock() : ''}
		`;
	}

	render() {
		return html`
			${this.isConfigMode ? this.renderConfigMode() : ''}

			<!--eslint-disable-next-line prettier/prettier -->
			${this.title && this.isConfigMode ? html`<h2>${this.content.preview.title}:</h2>` : ''}
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
									style="max-width: ${this.thumbnail.width}px" />
							</div>
					  `
					: ''}

				<div class="read-more">
					${this.pageSource
						? html`<p>${this.content.preview.readMore}: <a href="${this.pageSource}">${this.pageSource}</a></p>`
						: ''}
				</div>
			</div>
		`;
	}
	//#endregion RENDER
}

declare global {
	interface HTMLElementTagNameMap {
		'my-element': MyElement;
	}
}
