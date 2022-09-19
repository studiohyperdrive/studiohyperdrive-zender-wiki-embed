const getLanguage = () => document.documentElement.lang || 'nl';

export const { language: currentLanguage } = new Intl.Locale(getLanguage());

export const translatedContent = {
	en: {
		search: {
			inputPlaceholder: 'Enter a Q-ID or a wikipedia page url',
			btnText: 'Show code & preview',
		},
		imgPosition: {
			title: 'Where should the image be positioned?',
			optionLeft: 'On the left',
			optionRight: 'On the right',
			optionBottom: 'Under text',
			optionNoImg: 'Hide image',
			noImgAvailable: 'No image availabe',
		},
		code: {
			title: 'Code',
			btnText: 'copy code',
			btnClickFeedback: 'Code copied!',
		},
		preview: {
			title: 'Preview',
			readMore: 'Read more',
		},
		errors: {
			invalid: 'Please enter a valid Q-ID or a Wikipedia url.',
			notSupported: 'Could not find the english version of this Wikipedia article.',
		},
	},
	nl: {
		search: {
			inputPlaceholder: 'Vul een Q-ID of een wikipedia pagina url',
			btnText: 'Toon code & voorbeeld',
		},
		imgPosition: {
			title: 'Waar moet de afbeelding gepositioneerd worden?',
			optionLeft: 'Links',
			optionRight: 'Rechts',
			optionBottom: 'Van onder',
			optionNoImg: 'Verberg afbeelding',
			noImgAvailable: 'Geen afbeelding beschikbaar',
		},
		code: {
			title: 'Code',
			btnText: 'kopiër code',
			btnClickFeedback: 'Code gekopieerd!',
		},
		preview: {
			title: 'Voorbeeld',
			readMore: 'Lees meer',
		},
		errors: {
			invalid: 'Gelieve een geldig Q-ID of een wikipedia url in te geven.',
			notSupported: 'Nederlandse versie van dit artikel kon niet teruggevonden worden.',
		},
	},
};
