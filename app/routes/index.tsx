import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { Footer } from '~/components/footer';
import { Route } from '~/constants';
import i18next from '~/i18n/i18n.server';

import stylesUrl from '~/styles/index.css';

export const loader: LoaderFunction = async ({ request }) => {
	const t = await i18next.getFixedT(request);
	const title = t('header.default');
	const description = t('description.headerDefault');
	return json({ title, description });
};

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const meta: MetaFunction = ({ data }) => {
	return { title: data.title, description: data.description };
};

export const handle = {
	i18n: 'home',
};

export default function IndexRoute() {
	const { t } = useTranslation('home');

	return (
		<div className='container'>
			<div className='content'>
				<h1>
					JavaScript <span>Quiz</span>
				</h1>
				<nav>
					<ul>
						<li>
							<Link to={Route.rules}>{t('link.rules')}</Link>
						</li>
						<li>
							<Link to={Route.games}>{t('link.previousGames')}</Link>
						</li>
						<li>
							<Link to={Route.play}>{t('link.newGame')}</Link>
						</li>
					</ul>
				</nav>
			</div>
			<Footer />
		</div>
	);
}
