export enum Role {
	admin = 'ADMIN',
	player = 'PLAYER',
}

export enum Theme {
	html = 'HTML',
	css = 'CSS',
	javascript = 'JAVASCRIPT',
	other = 'OTHER',
}

export const TimesofDay = {
	morning: 'morning',
	afternoon: 'afternoon',
	evening: 'evening',
} as const;

export const Route = {
	rules: 'rules',
	games: 'games',
	play: 'play',
} as const;

export const Flag = {
	en: 'Flag_of_Australia',
	ru: 'Flag_of_Russia',
} as const;
