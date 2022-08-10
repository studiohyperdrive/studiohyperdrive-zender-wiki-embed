export const stringToUrl = (urlInStringFormat: string): URL | null => {
	let url;

	try {
		url = new URL(urlInStringFormat);

		return url;
	} catch (error) {
		return null;
	}
};
