import { NavLink } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Route } from '~/constants';
import stylesUrl from './style.css';

export function links() {
	return [{ rel: 'stylesheet', href: stylesUrl }];
}

export const handle = {
	i18n: 'header',
};

export const HeaderNav = () => {
	const { t } = useTranslation('header');
	return (
		<nav>
			<ul className='linksList'>
				<li className='linkItem'>
					<NavLink
						to={Route.rules}
						prefetch='intent'
						className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
					>
						{t('link.rules')}
					</NavLink>
				</li>
				<li className='linkItem'>
					<NavLink
						to={Route.games}
						prefetch='intent'
						className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
					>
						{t('link.results')}
					</NavLink>
				</li>
				<li className='linkItem'>
					<NavLink
						to={Route.game}
						prefetch='intent'
						className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
					>
						{t('link.newGame')}
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
