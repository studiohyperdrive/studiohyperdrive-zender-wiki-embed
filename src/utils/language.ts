const getLanguage = () => document.documentElement.lang || 'nl';

export const { language: currentLanguage } = new Intl.Locale(getLanguage());
