import { RemixServer } from '@remix-run/react';
import type { EntryContext } from '@remix-run/server-runtime';
import { createInstance } from 'i18next';
import Backend from 'i18next-fs-backend';
import { resolve } from 'node:path';
import { renderToString } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from '~/i18n/i18n.server';
import i18n from '~/i18n/i18n';

export default async function handleRequest(
	request: Request,
	statusCode: number,
	headers: Headers,
	context: EntryContext,
) {
	let instance = createInstance();
	let lng = await i18next.getLocale(request);
	let ns = i18next.getRouteNamespaces(context);

	await instance
		.use(initReactI18next)
		.use(Backend)
		.init({
			...i18n,
			lng,
			ns,
			backend: {
				loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
			},
		});

	const markup = renderToString(
		<I18nextProvider i18n={instance}>
			<RemixServer context={context} url={request.url} />
		</I18nextProvider>,
	);

	headers.set('Content-Type', 'text/html');

	return new Response('<!DOCTYPE html>' + markup, {
		status: statusCode,
		headers: headers,
	});
}
