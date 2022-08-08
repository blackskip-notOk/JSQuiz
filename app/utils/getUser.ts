import { db } from '~/utils/db.server';
import { redirect } from '@remix-run/node';
import { Route } from '~/constants';
import { getUserSession } from './session.server';
import { logout } from './login';

export async function getUserId(request: Request) {
	const session = await getUserSession(request);
	const userId = session.get('userId');

	if (!userId || typeof userId !== 'string') {
		return null;
	}
	return userId;
}

export async function requireUserId(
	request: Request,
	redirectTo: string = new URL(request.url).pathname,
) {
	const session = await getUserSession(request);
	const userId = session.get('userId');

	if (!userId || typeof userId !== 'string') {
		const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
		throw redirect(`/${Route.login}?${searchParams}`);
	}
	return userId;
}

export async function getUser(request: Request) {
	const userId = await getUserId(request);

	if (typeof userId !== 'string') {
		return null;
	}

	try {
		const user = await db.user.findUnique({
			where: { id: userId },
			select: { id: true, username: true },
		});
		return user;
	} catch {
		throw logout(request);
	}
}
