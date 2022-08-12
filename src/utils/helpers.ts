export const stringToUrl = (urlInStringFormat: string): URL | null => {
	let url;

	try {
		url = new URL(urlInStringFormat);

		return url;
	} catch (error) {
		return null;
	}
};

// credit: https://www.freecodecamp.org/news/javascript-debounce-example
export const debounceLeading = (func: () => void, timeout = 300) => {
	let timer: number | undefined;

	return (...args: never) => {
		if (!timer) {
			func.apply(this, args);
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = undefined;
		}, timeout);
	};
};

export const removeFocus = () => {
	if (document.activeElement instanceof HTMLElement) {
		document.activeElement.blur();
	}
};
