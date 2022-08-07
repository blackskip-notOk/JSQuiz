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
	login: 'login',
	logout: 'logout',
	rules: 'rules',
	games: 'games',
	game: 'game',
	new: 'new',
	play: 'play',
} as const;
