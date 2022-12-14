import type { Role } from '@prisma/client';
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
