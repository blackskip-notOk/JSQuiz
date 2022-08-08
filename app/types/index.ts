import type { Role } from "@prisma/client";

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