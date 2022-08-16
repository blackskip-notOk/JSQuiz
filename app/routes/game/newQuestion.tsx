import { Theme } from '@prisma/client';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, Link, useActionData, useCatch, useTransition } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { GameDisplay } from '~/components/game';
import { Route } from '~/constants';
import { getQuestionTheme } from '~/helpers/getQuestionTheme';
import i18n from '~/i18n/i18n';
import i18next from '~/i18n/i18n.server';
import type { QuestionActionData } from '~/types';
import { db } from '~/utils/db.server';
import { getUser, getUserId, requireUserId } from '~/utils/getUser';

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await getUserId(request);
	if (!userId) {
		throw new Response('Unauthorized', { status: 401 });
	}
	return json({});
};

// function validateGameContent(content: string) {
// 	if (content.length < 10) {
// 		return 'This game is too short';
// 	}
// }

// function validateGameName(name: string) {
// 	if (name.length < 3) {
// 		return "That game's name is too short";
// 	}
// }

const badRequest = (data: QuestionActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
	const t = await i18next.getFixedT(request);

	const user = await getUser(request);

	if (!user) {
		return redirect(`/${Route.login}`);
	}

	const form = await request.formData();
	const title = form.get('title');
	const content = form.get('content');
	const theme = getQuestionTheme(form.get('theme'));
	const author = user.id;
	// const authorId = user.id;

	if (typeof title !== 'string' || typeof content !== 'string') {
		return badRequest({
			formError: t('errors.formSubmit'),
		});
	}

	// const fieldErrors = {
	// 	name: validateGameName(name),
	// 	content: validateGameContent(content),
	// };

	const fields = { title, content, theme };

	// if (Object.values(fieldErrors).some(Boolean)) {
	// 	return badRequest({
	// 		fieldErrors,
	// 		fields,
	// 	});
	// }

	const updateUser = await db.user.update({
		where: { id: user.id },
		data: {
			questions: {
				create: { ...fields },
			},
		},
	});

	// const question = await db.question.create({
	// 	data: { ...fields },
	// });
	return redirect(`/${Route.game}`);
};

export const handle = {
	i18n: 'game',
};

export default function NewQuestionRoute() {
	const { t } = useTranslation();
	const actionData = useActionData<QuestionActionData>();
	const transition = useTransition();

	if (transition.submission) {
		const title = transition.submission.formData.get('title');
		const content = transition.submission.formData.get('content');
		const theme = transition.submission.formData.get('theme');

		if (typeof title === 'string' && typeof content === 'string') {
			return (
				<>
					<div>{title}</div>
					<div>{content}</div>
					<div>{theme}</div>
				</>
			);
		}
	}

	return (
		<div>
			<Form method='post'>
				<div>
					<label>
						{t('title')}
						<input
							type='text'
							name='title'
							defaultValue={actionData?.fields?.title}
							aria-invalid={Boolean(actionData?.fieldErrors?.title) || undefined}
							aria-errormessage={actionData?.fieldErrors?.title ? 'title-error' : undefined}
						/>
					</label>
					{actionData?.fieldErrors?.title ? (
						<p className='form-validation-error' role='alert' id='title-error'>
							{actionData.fieldErrors.title}
						</p>
					) : null}
				</div>
				<div>
					<label>
						{t('content')}
						<textarea
							name='content'
							defaultValue={actionData?.fields?.content}
							aria-invalid={Boolean(actionData?.fieldErrors?.content) || undefined}
							aria-errormessage={actionData?.fieldErrors?.content ? 'content-error' : undefined}
						/>
					</label>
					{actionData?.fieldErrors?.content ? (
						<p className='form-validation-error' role='alert' id='content-error'>
							{actionData.fieldErrors.content}
						</p>
					) : null}
				</div>
				<div>
					<label htmlFor='theme-select' className='selectLabel'>
						<select id='theme-select' name='theme' defaultValue=''>
							<option value='' disabled>
								{t('selectQuestion')}
							</option>
							<option value={Theme.HTML}>{t('HTML')}</option>
							<option value={Theme.CSS}>{t('CSS')}</option>
							<option value={Theme.JAVASCRIPT}>{t('JAVASCRIPT')}</option>
							<option value={Theme.OTHER}>{t('OTHER')}</option>
						</select>
					</label>
				</div>
				<div>
					{actionData?.formError ? (
						<p className='form-validation-error' role='alert'>
							{actionData.formError}
						</p>
					) : null}
					<button type='submit' className='button'>
						Add
					</button>
				</div>
			</Form>
		</div>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	if (caught.status === 401) {
		return (
			<div className='error-container'>
				<p>You must be logged in to create a game.</p>
				<Link to='/login'>Login</Link>
			</div>
		);
	}
}

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error);

	return <div className='error-container'>Something unexpected went wrong. Sorry about that.</div>;
}
