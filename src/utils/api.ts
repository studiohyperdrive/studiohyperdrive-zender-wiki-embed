import axios, { AxiosResponse } from 'axios';

import { config } from '../config';
import {
	LanguageLinkResponse,
	WikiIdResponse,
	WikiLanglinksResponse,
	WikiSummaryResponse,
} from '../my-element/my-element.types';

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
	const fetchLangLinks: AxiosResponse<WikiLanglinksResponse> | null = await axios
		.get(`${config.wikiActionApiUrl(languageCode)}&prop=langlinks&pageids=${pageId}`)
		.catch(() => null);

	return fetchLangLinks?.data?.query?.pages?.[pageId];
};

export const getAvailableLangByTitle = async (rawTitle: string, languageCode: string) => {
	if (!rawTitle || !languageCode) {
		return [];
	}

	const title = cleanupTitle(rawTitle);

	const fetchLangLinks: AxiosResponse<LanguageLinkResponse[]> | null = await axios
		.get(`${config.wikiRestApiUrl2(languageCode)}/${title}/links/language`)
		.catch(() => null);

	return fetchLangLinks?.data;
};

export const getTitlesAndLangsByQid = async (wikiId: string) => {
	const id = wikiId.toUpperCase();

	const fetchWikiTitleById: AxiosResponse<WikiIdResponse> = await axios.get(`${config.wikidataActionApiUrl}&ids=${id}`);
	const titlesByLang = fetchWikiTitleById.data.entities?.[id]?.sitelinks;

	return titlesByLang;
};

export const getSummaryByUrl = async (url: string | undefined) => {
	if (!url) {
		return null;
	}

	const summary: AxiosResponse<WikiSummaryResponse> = await axios.get(url);

	return summary.data;
};
