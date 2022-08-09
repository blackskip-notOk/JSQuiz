export const Theme = {
	html: 'HTML',
	css: 'CSS',
	javascript: 'JAVASCRIPT',
	other: 'OTHER',
} as const;

export const TimesOfDay = {
	morning: 'morning',
	afternoon: 'afternoon',
	evening: 'evening',
} as const;

export const Route = {
	home: '/',
	login: 'login',
	logout: 'logout',
	rules: 'rules',
	games: 'games',
	game: 'game',
	new: 'new',
	play: 'play',
	remix: 'https://remix.run',
} as const;

export const LoginTypes = {
	login: 'login',
	register: 'register',
} as const;

export type LoginType = keyof typeof LoginTypes;
