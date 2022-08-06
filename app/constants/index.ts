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
	home: '.',
	rules: 'rules',
	games: 'games',
	play: 'play',
} as const;
