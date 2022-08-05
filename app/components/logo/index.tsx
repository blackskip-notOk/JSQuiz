import type { LinksFunction } from '@remix-run/node';
import stylesUrl from './style.css';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const Logo = () => {
	return <div className='logoContainer'><img src='/images/logo/logo.svg' alt='logo' className='logo' /></div>;
};
