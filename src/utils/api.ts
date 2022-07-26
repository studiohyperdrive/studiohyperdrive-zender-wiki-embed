import axios, { AxiosResponse } from 'axios';

import { LanguageLinkResponse, WikiLanglinksResponse } from '../my-element.types';

// TODO: use config to "store" api endpoints.

export const getContentUrlByTitle = (title?: string, languageCode?: string) => {
	if (!title || !languageCode) {
		return '';
	}

	return `https://${languageCode}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${title}&explaintext&origin=*`;
};

export const getAvailableLangByPageId = async (pageId: string, languageCode: string) => {
	const fetchLangLinks: AxiosResponse<WikiLanglinksResponse> = await axios.get(
		`https://${languageCode}.wikipedia.org/w/api.php?action=query&format=json&prop=langlinks&pageids=${pageId}&lllimit=500&origin=*`,
	);
	const langLinks = fetchLangLinks.data.query.pages[pageId].langlinks;

	return langLinks;
};

export const getAvailableLangByTitle = async (title: string, languageCode: string) => {
	const fetchLangLinks: AxiosResponse<LanguageLinkResponse[]> = await axios.get(
		`https://${languageCode}.wikipedia.org/w/rest.php/v1/page/${title}/links/language`,
	);

	return fetchLangLinks.data;
};
