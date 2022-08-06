import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { links as HeaderNavLinks } from '~/components/headerNav';
import { links as TranslationToggleLinks } from '~/components/translationToggle';
import { links as LogoLinks } from '~/components/logo';
import i18next from '~/i18n/i18n.server';

import stylesUrl from '~/styles/index.css';

export const loader: LoaderFunction = async ({ request }) => {
	const t = await i18next.getFixedT(request);
	const title = t('header.default');
	const description = t('description.headerDefault');
	return json({ title, description });
};

export const links: LinksFunction = () => {
	return [
		...TranslationToggleLinks(),
		...HeaderNavLinks(),
		...LogoLinks(),
		{ rel: 'stylesheet', href: stylesUrl },
	];
};

export const meta: MetaFunction = ({ data }) => {
	return { title: data.title, description: data.description };
};

export default function IndexRoute() {
	return (
		<main>
			<h1>
				JavaScript <span>Quiz</span>
			</h1>
		</main>
	);
}
