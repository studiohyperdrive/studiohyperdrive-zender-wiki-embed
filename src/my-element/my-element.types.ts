//#region WikiIdResponse
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
}
//#endregion WikiIdResponse

//#region WikiLanglinksResponse
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
	langlinks?: Langlink[];
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
//#endregion WikiLanglinksResponse

//#region WikiSummaryResponse
export interface WikiSummaryResponse {
	type: string;
	title: string;
	displaytitle: string;
	wikibase_item: string;
	titles: Titles;
	pageid: number;
	thumbnail?: WikiImage;
	originalimage: WikiImage;
	lang: string;
	dir: string;
	revision: string;
	tid: string;
	timestamp: Date;
	description: string;
	content_urls: ContentUrls;
	extract: string;
	extract_html: string;
}
export interface Titles {
	canonical: string;
	normalized: string;
	display: string;
}

export interface WikiImage {
	source: string;
	width: number;
	height: number;
}

export interface ContentUrls {
	desktop: ContentUrl;
	mobile: ContentUrl;
}

export interface ContentUrl {
	page: string;
	revisions: string;
	edit: string;
	talk: string;
}
//#endregion WikiSummaryResponse
