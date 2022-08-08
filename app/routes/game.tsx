import type { Game } from '@prisma/client';
import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, Link, useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { Route } from '~/constants';

import stylesUrl from '~/styles/game.css';
import { db } from '~/utils/db.server';
import { getUser } from '~/utils/getUser';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

type LoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
	gameListItems: Array<Pick<Game, 'id' | 'name'>>;
};

export const loader: LoaderFunction = async ({ request }) => {
	const gameListItems = await db.game.findMany({
		take: 5,
		select: { id: true, name: true },
		orderBy: { createdAt: 'desc' },
	});
	const user = await getUser(request);

	const data = {
		gameListItems,
		user,
	};
	return json(data);
};

export const handle = {
	i18n: 'game',
};

export default function GameRoute() {
	const { t } = useTranslation('game');
	const data = useLoaderData<LoaderData>();

	const game = data.gameListItems.map((item) => (
		<li key={item.id}>
			<Link to={item.id} prefetch='intent'>
				{item.name}
			</Link>
		</li>
	));

	const isGames = !!game.length;

	return (
		<div className='games-layout'>
			<header className='games-header'>
				<div className='container'>
					<h1 className='home-link'>
						{isGames ? (
							t('headerGames')
						) : (
							<Link to={Route.new} title={t('headerNewGame')} aria-label='Create a new game'>
								{t('headerNoGames')}
							</Link>
						)}
					</h1>
				</div>
			</header>
			<main className='games-main'>
				<div className='container'>
					<div className='games-list'>
						<Link to='.'>Get a random joke</Link>
						<p>Here are a few more games to check out:</p>
						<ul>{game}</ul>
						<Link to='new' className='button'>
							Add your own
						</Link>
					</div>
					<div className='games-outlet'>
						<Outlet />
					</div>
				</div>
			</main>
		</div>
	);
}
