import type { Question, Role, Theme } from '@prisma/client';
import type { getUser } from '~/utils/getUser';

export type RootLoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
	locale: string;
	description: string;
};

export type LoginActionData = {
	formError?: string;
	fieldErrors?: {
		username: string | undefined;
		password: string | undefined;
		role: string | undefined;
	};
	fields?: {
		loginType: string;
		username: string;
		password: string;
		role: Role | null;
	};
};

export type LoginForm = {
	username: string;
	password: string;
	role?: Role | null;
};

export type GameLoaderData = {
	questionListItems: Array<Question>;
};

export type QuestionActionData = {
	formError?: string;
	fieldErrors?: {
		title: string | undefined;
		content: string | undefined;
		theme: string | undefined;
	};
	fields?: {
		title: string;
		content: string;
		theme: Theme;
	};
};
