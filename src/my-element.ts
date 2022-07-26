import axios, { AxiosResponse } from 'axios';
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { WikiIdResponse } from './my-element.types';
import { getAvailableLangByPageId, getAvailableLangByTitle, getContentUrlByTitle } from './utils/api';
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
	searchValue = 'earth';

	/**
	 * The number of times the button has been clicked.
	 */
	@property({ type: Number })
	count = 0;

	@property()
	data = 'placeholder';

	render() {
		return html`
			<input @change=${(e: any) => (this.searchValue = e.target.value)} />
			<button @click=${this.fetchWiki} part="button">fetch</button>
			<p>${this.data}</p>
			<slot></slot>
		`;
	}

	private async getWikiByurl(url: string) {
		const pageId = new URL(url).searchParams.get('curid');

		if (pageId) {
			// Checks if string is a valid wikipedia url.Example https://en.wikipedia.org
			const regex = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org/i;
			const [, , , languageCode] = url.match(regex) || [];
			let urlByPageId = `https://${languageCode}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&pageids=${pageId}&explaintext&origin=*`;

			if (languageCode !== currentLanguage) {
				const langLinks = await getAvailableLangByPageId(pageId, languageCode);
				const langLinkCurrLang = langLinks.find(({ lang }) => lang === currentLanguage);

				urlByPageId = getContentUrlByTitle(langLinkCurrLang?.['*'], langLinkCurrLang?.lang);
			}

			return urlByPageId;
		}

		// Checks if string is a valid wikipedia article url with title. Example: https://en.wikipedia.org/wiki/Universe
		const urlRegex = /(https:\/\/)?(www\.)?([a-zA-Z]+)\.wikipedia\.org\/wiki\/([a-zA-Z]+)/i;
		const [, , , languageCode, title] = url.match(urlRegex) || [];
		let wikiUrl = getContentUrlByTitle(title, languageCode);

		if (languageCode !== currentLanguage) {
			const langLinks = await getAvailableLangByTitle(title, languageCode);
			const langLinkCurrLang = langLinks.find(({ code }) => code === currentLanguage);

			wikiUrl = getContentUrlByTitle(langLinkCurrLang?.title, langLinkCurrLang?.code);
		}

		return wikiUrl;
	}

	private async getWikiByQid(wikiId: string) {
		const id = wikiId.toUpperCase();

		const fetchWikiTitleById: AxiosResponse<WikiIdResponse> = await axios.get(
			`https://www.wikidata.org/w/api.php?action=wbgetentities&props=sitelinks&ids=${id}&format=json&origin=*`,
		);
		const titlesByLang = fetchWikiTitleById.data.entities?.[id]?.sitelinks;

		const titleInCurrLang = titlesByLang?.[`${currentLanguage}wiki`] || titlesByLang?.['enwiki'];
		const languageCode = titleInCurrLang.site.slice(0, 2);

		const wikiUrl = getContentUrlByTitle(titleInCurrLang?.title, languageCode);

		return wikiUrl;
	}

	private async fetchWiki() {
		console.log(await this.getWikiByQid('q1'));
		console.log(await this.getWikiByurl('https://nl.wikipedia.org/wiki/Wolk'));
		console.log(await this.getWikiByurl('https://en.wikipedia.org/wiki?curid=47515'));
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
