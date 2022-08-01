export const config = {
	wikiRestApiUrl: (languageCode: string) => `https://${languageCode}.wikipedia.org/api/rest_v1/page`,
	wikiActionApiUrl: (languageCode: string) =>
		`https://${languageCode}.wikipedia.org/w/api.php?action=query&format=json&lllimit=500&origin=*`,
	wikidataActionApiUrl: 'https://www.wikidata.org/w/api.php?action=wbgetentities&props=sitelinks&format=json&origin=*',
};
