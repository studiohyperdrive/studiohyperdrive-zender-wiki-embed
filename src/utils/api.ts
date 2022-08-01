import axios, { AxiosResponse } from 'axios';

import { config } from '../config';
import { LanguageLinkResponse, WikiIdResponse, WikiLanglinksResponse } from '../my-element.types';

const cleanupTitle = (rawTitle: string) => {
	// Replace spaces with underscore.
	return rawTitle.replace(/ /g, '_');
};

export const getContentUrlByTitle = (rawTitle?: string, languageCode?: string) => {
	if (!rawTitle || !languageCode) {
		return '';
	}

	const title = cleanupTitle(rawTitle);

	return `${config.wikiRestApiUrl(languageCode)}/summary/${title}`;
};

export const getAvailableLangByPageId = async (pageId: string, languageCode: string) => {
	const fetchLangLinks: AxiosResponse<WikiLanglinksResponse> = await axios.get(
		`${config.wikiActionApiUrl(languageCode)}&prop=langlinks&pageids=${pageId}`,
	);

	return fetchLangLinks.data.query.pages?.[pageId];
};

export const getAvailableLangByTitle = async (rawTitle: string, languageCode: string) => {
	if (!rawTitle || !languageCode) {
		return [];
	}

	const title = cleanupTitle(rawTitle);

	const fetchLangLinks: AxiosResponse<LanguageLinkResponse[]> = await axios.get(
		`${config.wikiRestApiUrl(languageCode)}/${title}/links/language`,
	);

	return fetchLangLinks.data;
};

export const getTitlesAndLangsByQid = async (wikiId: string) => {
	const id = wikiId.toUpperCase();

	const fetchWikiTitleById: AxiosResponse<WikiIdResponse> = await axios.get(`${config.wikidataActionApiUrl}&ids=${id}`);
	const titlesByLang = fetchWikiTitleById.data.entities?.[id]?.sitelinks;

	return titlesByLang;
};
