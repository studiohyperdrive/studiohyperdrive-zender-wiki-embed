export interface WikiIdResponse {
	entities: Entities;
}

export interface Entities {
	[wikiId: string]: EntityItem;
}

export interface EntityItem {
	type: string;
	id: string;
	sitelinks: Sitelinks;
}

export interface Sitelinks {
	[langwiki: string]: LangWiki;
}

export interface LangWiki {
	site: string;
	title: string;
	badges: any[];
}

export interface WikiLanglinksResponse {
	batchcomplete: string;
	query: Query;
}

export interface Query {
	pages: Pages;
}

export interface Pages {
	[pageId: string]: PageId;
}

export interface PageId {
	pageid: number;
	title: string;
	langlinks: Langlink[];
}

export interface Langlink {
	lang: string;
	'*': string; // title
}

export interface LanguageLinkResponse {
	code: string;
	name: string;
	key: string;
	title: string;
}
