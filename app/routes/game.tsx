import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, Link, useLoaderData, Form } from '@remix-run/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Question } from '~/components/question';
import { Route } from '~/constants';

import stylesUrl from '~/styles/game.css';
import type { GameLoaderData } from '~/types';
import { db } from '~/utils/db.server';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ request }) => {
	const questionListItems = await db.question.findMany({
		select: { id: true, title: true, theme: true, content: true },
		orderBy: { createdAt: 'desc' },
	});

	const data = { questionListItems };
	return json(data);
};

export const handle = {
	i18n: 'game',
};

export default function GameRoute() {
	const { t } = useTranslation('game');
	const data = useLoaderData<GameLoaderData>();

	const isQuestions = useMemo(() => !!data.questionListItems.length, [data.questionListItems]);

	const question = data.questionListItems.map((item) => <Question key={item.id} question={item} />);

	return (
		<div className='gameContainer'>
			<header className='headerGame'>
				<h1>{t('newGame')}</h1>
			</header>

			{isQuestions ? (
				<Form method='post' className='form'>
					{/* <label htmlFor='question-select' className='selectLabel'>
						<select id='question-select' name='question' defaultValue=''>
							<option value='' disabled>
								{t('selectQuestion')}
							</option>
							{question}
						</select>
					</label> */}
					<ul>{question}</ul>
				</Form>
			) : null}
			<Link to={Route.newQuestion} className='button'>
				{t('addNewQuestion')}
			</Link>
			<div className='game-outlet'>
				<Outlet />
			</div>
		</div>
	);
}
