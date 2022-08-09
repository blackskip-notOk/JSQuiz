import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import i18next from '~/i18n/i18n.server';
import { useTranslation } from 'react-i18next';
import stylesUrl from '~/styles/rules.css';
import { getUser } from '~/utils/getUser';
import { useLoaderData } from '@remix-run/react';

export type RulesLoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
}

export const loader: LoaderFunction = async ({ request }) => {
	const user = await getUser(request);
	const t = await i18next.getFixedT(request);
	const title = t('header.rules');
	const description = t('description.headerRules');
	return json({ title, description, user });
};

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const meta: MetaFunction = ({ data }) => {
	return { title: data.title, description: data.description };
};

export const handle = {
	i18n: 'rules',
};

export default function RulesRoute() {
	const { t } = useTranslation('rules');
	const data = useLoaderData<RulesLoaderData>();

	return (
		<div className='rulesContainer'>
			<h1>{data.user}</h1>
			<h1>{t('header')}</h1>
			<ul>
				<li>{t('first')}</li>
				<li>{t('second')}</li>
				<li>{t('third')}</li>
				<li>{t('forth')}</li>
				<li>{t('fifth')}</li>
				<li>{t('sixth')}</li>
			</ul>
		</div>
	);
}
