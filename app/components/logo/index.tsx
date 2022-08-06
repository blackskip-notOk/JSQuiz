import type { LinksFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { Route } from '~/constants';
import stylesUrl from './style.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const Logo = () => {
	return (
		<div className='logoContainer'>
			<Link to={Route.home}>
				<img src='/images/logo/logo.svg' alt='logo' className='logo' />
			</Link>
		</div>
	);
};
