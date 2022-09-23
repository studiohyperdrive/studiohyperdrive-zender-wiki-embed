const getLanguage = () => document.documentElement.lang || 'nl';

export const { language: currentLanguage } = new Intl.Locale(getLanguage());

export const translatedContent = {
	en: {
		info: {
			description: `This tool makes it easy to embed Wikipedia summaries into your website. To get started include the script into your website, then search for your desired Wikipedia article. Copy the html code and paste it into a page. The article will be shown in the language of the website (if available).

				If you're using this tool for "Zender" then just copy the JSON code into the cms.`,
			btnText: 'copy script',
			btnClickFeedback: 'script copied!',
		},
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
		info: {
			description: `Deze site maakt het gemakkelijk om Wikipedia samenvattingen toe te voegen in uw website. Om te starten moet u de onderstaande script kopiëren en in uw site plakken, daarna zoekt u uw gewenste Wikipedia artikel en kopiërt u de html code in een pagina. De artikel zal in de taal van uw website weergegeven worden (indien beschikbaar).
				
				Als u deze toepassing gebruikt voor "Zender", dan moet u alleen de JSON code kopiëren en plakken in het gewenste CMS.
				`,
			btnText: 'kopiër script',
			btnClickFeedback: 'script gekopieerd!',
		},
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
