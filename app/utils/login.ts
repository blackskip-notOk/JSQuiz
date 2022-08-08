import { db } from '~/utils/db.server';
import type { LoginForm } from "~/types";
import { compare } from 'bcryptjs';
import { getUserSession, storage } from './session.server';
import { redirect } from '@remix-run/node';
import { Route } from '~/constants';

export async function login({ username, password }: LoginForm) {
	const user = await db.user.findFirst({
		where: { username },
	});

	if (!user) {
		return null;
	}

	const isCorrectPassword = await compare(password, user.passwordHash);

	return isCorrectPassword ? { id: user.id, username } : null;
};

export async function logout(request: Request) {
	const session = await getUserSession(request);

	return redirect(`/${Route.login}`, {
		headers: {
			'Set-Cookie': await storage.destroySession(session),
		},
	});
};