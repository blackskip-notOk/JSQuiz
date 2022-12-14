import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, Link, useActionData, useCatch, useTransition } from '@remix-run/react';
import { GameDisplay } from '~/components/game';
import { db } from '~/utils/db.server';
import { getUserId, requireUserId } from '~/utils/getUser';

export const loader: LoaderFunction = async ({ request }) => {
	const userId = await getUserId(request);
	if (!userId) {
		throw new Response('Unauthorized', { status: 401 });
	}
	return json({});
};

function validateGameContent(content: string) {
	if (content.length < 10) {
		return 'This game is too short';
	}
}

function validateGameName(name: string) {
	if (name.length < 3) {
		return "That game's name is too short";
	}
}

type ActionData = {
	formError?: string;
	fieldErrors?: {
		name: string | undefined;
		content: string | undefined;
	};
	fields?: {
		name: string;
		content: string;
	};
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({ request }) => {
	const userId = await requireUserId(request);
	const form = await request.formData();
	const name = form.get('name');
	const content = form.get('content');
	if (typeof name !== 'string' || typeof content !== 'string') {
		return badRequest({
			formError: 'Form not sibmitted correctly',
		});
	}

	const fieldErrors = {
		name: validateGameName(name),
		content: validateGameContent(content),
	};

	const fields = { name, content };

	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({
			fieldErrors,
			fields,
		});
	}

	const game = await db.game.create({
		data: { ...fields, playerId: userId },
	});
	return redirect(`/games/${game.id}`);
};

export default function NewGameRoute() {
	const actionData = useActionData<ActionData>();
	const transition = useTransition();

	if (transition.submission) {
		const name = transition.submission.formData.get('name');
		const content = transition.submission.formData.get('content');
		if (
			typeof name === 'string' &&
			typeof content === 'string' &&
			!validateGameContent(content) &&
			!validateGameName(name)
		) {
			return <GameDisplay game={{ name, content }} isOwner={true} canDelete={false} />;
		}
	}

	return (
		<div>
			<p>Create a new Game</p>
			<Form method='post'>
				<div>
					<label>
						Name:{' '}
						<input
							type='text'
							name='name'
							defaultValue={actionData?.fields?.name}
							aria-invalid={Boolean(actionData?.fieldErrors?.name) || undefined}
							aria-errormessage={actionData?.fieldErrors?.name ? 'name-error' : undefined}
						/>
					</label>
					{actionData?.fieldErrors?.name ? (
						<p className='form-validation-error' role='alert' id='name-error'>
							{actionData.fieldErrors.name}
						</p>
					) : null}
				</div>
				<div>
					<label>
						Content:{' '}
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
