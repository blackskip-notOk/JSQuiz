import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	useCatch,
	useLoaderData,
} from '@remix-run/react';

import globalStylesUrl from './styles/global.css';
import globalMediumStylesUrl from './styles/global-medium.css';
import globalLargeStylesUrl from './styles/global-large.css';
import rootStyleUrl from './styles/root.css';
import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { ReactNode } from 'react';
import { useChangeLanguage } from 'remix-i18next';
import { useTranslation } from 'react-i18next';
import i18next from '~/i18n/i18n.server';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { links as HeaderNavLinks } from '~/components/headerNav';
import { links as TranslationToggleLinks } from '~/components/translationToggle';
import { links as LogoLinks } from '~/components/logo';

type LoaderData = { locale: string };

export const loader: LoaderFunction = async ({ request }) => {
	let locale = await i18next.getLocale(request);
	return json<LoaderData>({ locale });
};

export const handle = {
	i18n: 'translation',
};

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			href: globalStylesUrl,
		},
		{
			rel: 'stylesheet',
			href: rootStyleUrl,
		},
		...HeaderNavLinks(),
		...TranslationToggleLinks(),
		...LogoLinks(),
		{
			rel: 'stylesheet',
			href: globalMediumStylesUrl,
			media: 'print, (min-width: 640px)',
		},
		{
			rel: 'stylesheet',
			href: globalLargeStylesUrl,
			media: 'screen and (min-width: 1024px)',
		},
	];
};

export const meta: MetaFunction = () => {
	const description = `Learn JavaScript and made a good conversation at the same time!`;
	return {
		charset: 'utf-8',
		description,
		keywords: 'HTML, CSS, JavaScript',
		'twitter:creator': '@GmIlbabanov',
		'twitter:site': '@GmIlbabanov',
		'twitter:title': 'JS Quiz',
		'twitter:description': description,
	};
};

function Document({
	children,
	title = 'Welcome to JS Quiz!',
}: {
	children: ReactNode;
	title?: string;
}) {
	const { locale } = useLoaderData<LoaderData>();
	const { i18n } = useTranslation();
	useChangeLanguage(locale);

	return (
		<html lang={locale} dir={i18n.dir()}>
			<head>
				<Meta />
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<title>{title}</title>
				<Links />
			</head>
			<body>
				<div className='appContainer'>
					<Header className='header' />
					<div className='content'>{children}</div>
					<Footer className='footer' />
				</div>
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	return (
		<Document title={`${caught.status} ${caught.statusText}`}>
			<div className='error-container'>
				<h1>
					{caught.status} {caught.statusText}
				</h1>
			</div>
		</Document>
	);
}

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);

	return (
		<Document title='Uh-oh!'>
			<div className='error-container'>
				<h1>App Error</h1>
				<pre>{error.message}</pre>
			</div>
		</Document>
	);
}
