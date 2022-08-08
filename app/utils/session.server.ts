import { createCookieSessionStorage, redirect } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
	throw new Error('SESSION_SECRET must be set');
};

export const storage = createCookieSessionStorage({
	cookie: {
		name: 'JSQuiz_session',
		secure: process.env.NODE_ENV === 'production',
		secrets: [sessionSecret],
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
	},
});

export function getUserSession(request: Request) {
	return storage.getSession(request.headers.get('Cookie'));
};

export async function createUserSession(userId: string, redirectTo: string) {
	const session = await storage.getSession();

	session.set('userId', userId);

	return redirect(redirectTo, {
		headers: {
			'Set-Cookie': await storage.commitSession(session),
		},
	});
};
