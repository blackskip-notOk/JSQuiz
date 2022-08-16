import { Role } from '@prisma/client';
import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { NavLink, useLoaderData } from '@remix-run/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Route } from '~/constants';
import { getUser } from '~/utils/getUser';
import stylesUrl from './style.css';
import type { LoaderData } from './types';

export function links() {
	return [{ rel: 'stylesheet', href: stylesUrl }];
}

export const handle = {
	i18n: 'header',
};

export const loader: LoaderFunction = async ({ request }) => {
	const user = await getUser(request);

	const data = { user };
	return json(data);
};

export const HeaderNav = () => {
	const { t } = useTranslation('header');
	const data = useLoaderData<LoaderData>();
	const isAdmin = useMemo(() => data.user?.role === Role.ADMIN, [data.user]);

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
				{isAdmin ? (
					<li className='linkItem'>
						<NavLink
							to={Route.game}
							prefetch='intent'
							className={({ isActive }) => (isActive ? 'activeLink' : 'link')}
						>
							{t('link.newGame')}
						</NavLink>
					</li>
				) : null}
			</ul>
		</nav>
	);
};
