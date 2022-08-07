import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Route } from '~/constants';
import { getUser } from '~/utils/session.server';
import stylesUrl from './style.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

type LoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
	const user = await getUser(request);

	const data = {
		user,
	};
	return json(data);
};

export const handle = {
	i18n: 'login',
};

export const Login = () => {
	const { t } = useTranslation('login');
	const data = useLoaderData<LoaderData>();

	return data.user ? (
		<div className='user-info'>
			<span>{t('greeting', { username: data.user.username })}</span>
			<form action={Route.logout} method='post'>
				<button type='submit' className='button'>
					<img src='/images/login/logout.svg' alt='logout icon' className='login' />
				</button>
			</form>
		</div>
	) : (
		<Link to={Route.login}>
			<img src='/images/login/login.svg' alt='login icon' className='login' />
		</Link>
	);
};
