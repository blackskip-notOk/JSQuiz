import type { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Route } from '~/constants';
import stylesUrl from './style.css';
import type { LoginProps } from './types';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const handle = {
	i18n: 'login',
};

export const Login: FC<LoginProps> = ({ user }) => {
	const { t } = useTranslation('login');

	return user ? (
		<div className='user-info'>
			<span>{t('greeting', { username: user.username })}</span>
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
