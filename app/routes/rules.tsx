import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';

import { links as HeaderNavLinks } from '~/components/headerNav';
import { links as TranslationToggleLinks } from '~/components/translationToggle';
import { links as LogoLinks } from '~/components/logo';
import i18next from '~/i18n/i18n.server';

export const loader: LoaderFunction = async ({ request }) => {
	const t = await i18next.getFixedT(request);
	const title = t('header.default');
	const description = t('description.headerDefault');
	return json({ title, description });
};

export const links: LinksFunction = () => {
	return [...TranslationToggleLinks(), ...HeaderNavLinks(), ...LogoLinks()];
};

export const meta: MetaFunction = ({ data }) => {
	return { title: data.title, description: data.description };
};

export default function RulesRoute() {
	return (
		<article className='content'>
			<h1>Rules</h1>
		</article>
	);
}
