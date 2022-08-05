import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import { Footer } from '~/components/footer';
import { HeaderNav, links as HeaderNavLinks } from '~/components/headerNav';
import { TranslationToggle, links as TranslationToggleLinks } from '~/components/translationToggle';
import i18next from '~/i18n/i18n.server';

import stylesUrl from '~/styles/index.css';

export const loader: LoaderFunction = async ({ request }) => {
	const t = await i18next.getFixedT(request);
	const title = t('header.default');
	const description = t('description.headerDefault');
	return json({ title, description });
};

export const links: LinksFunction = () => {
	return [...TranslationToggleLinks(), ...HeaderNavLinks(), { rel: 'stylesheet', href: stylesUrl }];
};

export const meta: MetaFunction = ({ data }) => {
	return { title: data.title, description: data.description };
};

export default function IndexRoute() {
	return (
		<div className='container'>
			<header className='header'>
				<HeaderNav />
				<TranslationToggle />
			</header>
			<main className='content'>
				<h1>
					JavaScript <span>Quiz</span>
				</h1>
			</main>
			<Footer className='footer' />
		</div>
	);
}
