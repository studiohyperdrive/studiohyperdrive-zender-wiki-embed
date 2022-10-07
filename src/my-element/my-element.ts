/* eslint-disable @typescript-eslint/member-ordering */
import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../utils/index';

import {
	getAvailableLangByPageId,
	getAvailableLangByTitle,
	getSummaryUrlByTitle,
	getSummaryByUrl,
	getTitlesAndLangsByQid,
	getFullIntroUrlByTitle,
	getFullIntroByUrl,
} from '../utils/api';
import { debounceLeading, removeFocus, stringToUrl } from '../utils/helpers';
import { currentLanguage, translatedContent } from '../utils/language';
import { MyElementStyle } from './my-element.style';
import { WikiImage } from './my-element.types';

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
	isSourceInJson = true;
	@property({ type: Boolean })
	showCodeCopiedFeedback = false;
	@property({ type: Boolean })
	showScriptCopiedFeedback = false;
	@property({ type: Boolean })
	showInfoSection = false;

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

	@property()
	activeLanguage = currentLanguage;
	@property()
	content = this.activeLanguage === 'nl' ? translatedContent.nl : translatedContent.en;

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

	cdnScript =
		'<script type="module" src="https://cdn.jsdelivr.net/gh/studiohyperdrive/studiohyperdrive-zender-wiki-embed@release/stable/dist/zender-wiki-embed.min.js"></script>';

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

		if (this.isConfigMode && changedProperties.has('activeLanguage') && changedProperties.get('activeLanguage')) {
			this.content = this.activeLanguage === 'nl' ? translatedContent.nl : translatedContent.en;
			this.radioGroup = [
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

			if (this.qId) {
				this.debouncedFetchWiki();
			}
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

		if (languageCode === this.activeLanguage) {
			const summaryUrl = getSummaryUrlByTitle(infoBypageId.title, languageCode);
			const fullIntroUrl = getFullIntroUrlByTitle(infoBypageId.title, languageCode);

			return { summaryUrl, fullIntroUrl };
		}

		const langLinkCurrLang = infoBypageId?.langlinks?.find(({ lang }) => lang === this.activeLanguage);

		let summaryUrl;
		let fullIntroUrl;

		if (!langLinkCurrLang) {
			this.errorMessage = this.content.errors.notSupported;
			summaryUrl = getSummaryUrlByTitle(infoBypageId.title, languageCode);
			fullIntroUrl = getFullIntroUrlByTitle(infoBypageId.title, languageCode);
		} else {
			summaryUrl = getSummaryUrlByTitle(langLinkCurrLang?.['*'], langLinkCurrLang?.lang);
			fullIntroUrl = getFullIntroUrlByTitle(langLinkCurrLang?.['*'], langLinkCurrLang?.lang);
		}

		return { summaryUrl, fullIntroUrl };
	}

	async getWikiByTitleUrl(url: string) {
		// Checks if string is a valid wikipedia article url with title. Example: https://en.wikipedia.org/wiki/Universe
		const urlRegex = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org\/wiki\/([^/]+)/;
		const [, , , languageCode, title] = url.match(urlRegex) || [];

		if (languageCode === this.activeLanguage) {
			const summaryUrl = getSummaryUrlByTitle(title, languageCode);
			const fullIntroUrl = getFullIntroUrlByTitle(title, languageCode);

			return { summaryUrl, fullIntroUrl };
		}

		const langLinks = await getAvailableLangByTitle(title, languageCode);

		if (!langLinks) {
			this.errorMessage = this.content.errors.invalid;
			return;
		}

		const langLinkCurrLang = langLinks.find(({ code }) => code === this.activeLanguage);

		let summaryUrl;
		let fullIntroUrl;

		if (!langLinkCurrLang) {
			summaryUrl = getSummaryUrlByTitle(title, languageCode);
			fullIntroUrl = getFullIntroUrlByTitle(title, languageCode);

			this.errorMessage = this.content.errors.notSupported;
		} else {
			summaryUrl = getSummaryUrlByTitle(langLinkCurrLang?.title, langLinkCurrLang?.code);
			fullIntroUrl = getFullIntroUrlByTitle(langLinkCurrLang?.title, langLinkCurrLang?.code);
		}

		return { summaryUrl, fullIntroUrl };
	}

	async getWikiByurl(url: string) {
		const urlObject = stringToUrl(url);

		if (!urlObject) {
			this.errorMessage = this.content.errors.invalid;
			return;
		}

		const pageId = urlObject.searchParams.get('curid');

		if (pageId) {
			const urls = this.getWikiByPageIdUrl(url, pageId);

			return urls;
		}

		const urls = this.getWikiByTitleUrl(url);

		return urls;
	}

	async getWikiByQid(wikiId: string) {
		const titlesByLang = await getTitlesAndLangsByQid(wikiId);

		const titleInCurrLang =
			titlesByLang?.[`${this.activeLanguage}wiki`] ||
			titlesByLang?.['enwiki'] ||
			Object.values(titlesByLang ?? {})?.[0];

		if (!titleInCurrLang) {
			this.errorMessage = this.content.errors.invalid;
			return;
		}

		const languageCode = titleInCurrLang.site.slice(0, 2);

		const summaryUrl = getSummaryUrlByTitle(titleInCurrLang?.title, languageCode);
		const fullIntroUrl = getFullIntroUrlByTitle(titleInCurrLang?.title, languageCode);

		return { summaryUrl, fullIntroUrl };
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

		let urls: { summaryUrl: string; fullIntroUrl: string } | undefined;

		if (this.searchValue.match(searchRegex)) {
			urls = await this.getWikiByQid(this.searchValue);
		} else {
			urls = await this.getWikiByurl(this.searchValue);
		}

		const summary = await getSummaryByUrl(urls?.summaryUrl);
		const fullIntro = await getFullIntroByUrl(urls?.fullIntroUrl);

		if (!summary) {
			this.title = '';
			this.description = '';
			this.thumbnail = { source: '', height: 0, width: 0 };
			this.pageSource = '';
			this.qId = '';

			return;
		}

		this.qId = summary.wikibase_item;
		this.title = summary.title;
		this.description = fullIntro?.pages[fullIntro.pageids[0]].extract ?? '';
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
		if (!this.isSourceInJson) {
			this.outputSource = `<div data-my-wiki-el searchValue="${this.qId}" imgPosition="${this.imgPosition}"></div>`;
			return;
		}

		const code = {
			'data-my-wiki-el': '',
			searchvalue: this.qId,
			imgposition: this.imgPosition,
		};

		this.outputSource = `'${JSON.stringify(code, null, 2)}'`;
	}

	toggleInfoSection() {
		this.showInfoSection = !this.showInfoSection;
	}

	copyScriptToclipboard() {
		removeFocus();

		navigator.clipboard.writeText(this.cdnScript);

		this.showScriptCopiedFeedback = true;
		setTimeout(() => (this.showScriptCopiedFeedback = false), 1500);
	}

	copyCodeToclipboard() {
		removeFocus();

		navigator.clipboard.writeText(this.outputSource);

		this.showCodeCopiedFeedback = true;
		setTimeout(() => (this.showCodeCopiedFeedback = false), 1500);
	}

	toggleCodeLang(isJSON: boolean) {
		this.isSourceInJson = isJSON;
	}

	toggleLanguage(langCode: string) {
		this.activeLanguage = langCode;
	}
	//#endregion UTILS

	//#region RENDER
	static styles = MyElementStyle;

	renderImgPositionSetting() {
		return html`
			<h2>Config:</h2>

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

	renderInfo() {
		return html`
			<h2>Info:</h2>

			<ul class="nav nav-tabs width-border">
				<li class="nav-item">
					<a class="nav-link ${this.activeLanguage === 'nl' ? 'active' : ''}" @click=${() => this.toggleLanguage('nl')}
						>Nederlands</a
					>
				</li>
				<li class="nav-item">
					<a class="nav-link ${this.activeLanguage === 'en' ? 'active' : ''}" @click=${() => this.toggleLanguage('en')}
						>English</a
					>
				</li>
			</ul>

			<p>${this.content.info.description}</p>

			<div class="code-block" style="margin-bottom: 0">
				<code> ${this.cdnScript} </code>
				${this.showScriptCopiedFeedback ? html`<span>${this.content.info.btnClickFeedback}</span>` : ''}
				<button class="btn btn-code-copy" @click=${this.copyScriptToclipboard}>${this.content.info.btnText}</button>
			</div>

			<p style="margin-bottom: 2rem;">${this.content.info.descriptionForZender}</p>
		`;
	}

	renderCodeBlock() {
		return html`
			<h2>${this.content.code.title}:</h2>

			<ul class="nav nav-tabs">
				<li class="nav-item">
					<a class="nav-link ${this.isSourceInJson ? 'active' : ''}" @click=${() => this.toggleCodeLang(true)}>JSON</a>
				</li>
				<li class="nav-item">
					<a class="nav-link ${!this.isSourceInJson ? 'active' : ''}" @click=${() => this.toggleCodeLang(false)}
						>HTML</a
					>
				</li>
			</ul>

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
					<button class="btn btn-outline" @click=${this.toggleInfoSection} part="button" tabindex="3">?</button>
				</div>
				${this.errorMessage ? html`<p class="invalid-input-feedback">${this.errorMessage}</p>` : ''}

				<!-- eslint-disable-next-line prettier/prettier -->
				${this.showInfoSection ? this.renderInfo() : ''}

				<!-- eslint-disable-next-line prettier/prettier -->
				${this.qId ? this.renderImgPositionSetting() : ''}
			</div>

			${this.qId ? this.renderCodeBlock() : ''}
		`;
	}

	render() {
		return html`
			<div class="${this.isConfigMode ? 'container' : ''}">
				${this.isConfigMode ? this.renderConfigMode() : ''}

				<!--eslint-disable-next-line prettier/prettier -->
				${this.title && this.isConfigMode ? html`<h2>${this.content.preview.title}:</h2>` : ''}
				<div class="content-container ${this.imgPosition}">
					<div class="content">
						<h1 class="content-title">${this.title}</h1>

						${html`${unsafeHTML(this.description)}`}
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
