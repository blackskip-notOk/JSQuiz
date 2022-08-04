export type NativeName = 'English' | 'Русский';

export type Languages = {
	en: { nativeName: NativeName };
	ru: { nativeName: NativeName };
};

export const languages: Languages = {
	en: { nativeName: 'English' },
	ru: { nativeName: 'Русский' },
};

export type Language = keyof typeof languages;
