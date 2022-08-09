import type { ActionFunction, LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData, useSearchParams } from '@remix-run/react';
import { db } from '~/utils/db.server';
import { createUserSession } from '~/utils/session.server';
import i18next from '~/i18n/i18n.server';

import stylesUrl from '../styles/login.css';
import { Role } from '@prisma/client';
import { useTranslation } from 'react-i18next';
import { Route } from '~/constants';
import { useState } from 'react';
import { getRole } from '~/helpers/getRole';
import {
	badRequest,
	validatePassword,
	validateRole,
	validateUrl,
	validateUsername,
} from '~/helpers/validators';
import { getLogintype } from '~/helpers/getLoginType';
import type { LoginActionData } from '~/types';
import { register } from '~/utils/register';
import { login } from '~/utils/login';

export const links: LinksFunction = () => {
	return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ request }) => {
	const t = await i18next.getFixedT(request);
	const title = t('header.login');
	const description = t('description.headerLogin');
	return json({ title, description });
};

export const meta: MetaFunction = ({ data }) => {
	return { title: data.title, description: data.description };
};

export const action: ActionFunction = async ({ request }) => {
	const t = await i18next.getFixedT(request);

	const form = await request.formData();

	const loginType = getLogintype(form.get('loginType'));
	const username = form.get('username');
	const password = form.get('password');
	const role = getRole(form.get('role'));
	const redirectTo = validateUrl(form.get('redirectTo') || Route.home);

	if (
		typeof loginType !== 'string' ||
		typeof username !== 'string' ||
		typeof password !== 'string' ||
		typeof redirectTo !== 'string'
	) {
		return badRequest({
			formError: t('errors.formSubmit'),
		});
	}

	const fields = { loginType, username, password, role };
	const fieldErrors = {
		username: validateUsername(username, t('errors.nameLength')),
		password: validatePassword(password, t('errors.passwordLength')),
		role: validateRole(role, loginType, t('errors.role')),
	};

	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({ fieldErrors, fields });
	}

	const loginTypes = {
		login: async () => {
			const user = await login({ username, password });
			if (!user) {
				return badRequest({
					fields,
					formError: t('errors.wrongLogin'),
				});
			}
			return createUserSession(user.id, redirectTo);
		},
		register: async () => {
			const userExists = await db.user.findFirst({
				where: { username },
			});

			if (userExists) {
				return badRequest({
					fields,
					formError: t('errors.userExist', { username }),
				});
			}

			const user = await register({ username, password, role });

			if (!user) {
				return badRequest({
					fields,
					formError: t('failRegister'),
				});
			}
			return createUserSession(user.id, redirectTo);
		},
		default: () => {
			return badRequest({
				fields,
				formError: t('errors.wrongLoginType'),
			});
		},
	};

	return loginTypes[loginType]() || loginTypes.default;
};

export const handle = { i18n: 'login' };

export default function Login() {
	const { t } = useTranslation('login');
	const actionData = useActionData<LoginActionData>();
	const [searchParams] = useSearchParams();

	const [isRegister, setIsRegister] = useState(false);

	const handleSelect = () => {
		setIsRegister(!isRegister);
	};

	return (
		<div className='loginContent' data-light=''>
			<h1>{t('login')}</h1>
			<Form method='post'>
				<input
					type='hidden'
					name='redirectTo'
					value={searchParams.get('redirectTo') ?? undefined}
				/>
				<fieldset>
					<legend className='sr-only'>{t('loginType')}</legend>
					<label>
						<input
							type='radio'
							name='loginType'
							value='login'
							defaultChecked={
								!actionData?.fields?.loginType || actionData?.fields?.loginType === 'login'
							}
							onChange={handleSelect}
						/>{' '}
						{t('login')}
					</label>
					<label>
						<input
							type='radio'
							name='loginType'
							value='register'
							defaultChecked={actionData?.fields?.loginType === 'register'}
							onChange={handleSelect}
						/>{' '}
						{t('register')}
					</label>
				</fieldset>
				<div>
					<label htmlFor='username-input'>{t('username')}</label>
					<input
						type='text'
						id='username-input'
						name='username'
						defaultValue={actionData?.fields?.username}
						placeholder={t('usernamePlaceholder')}
						aria-invalid={Boolean(actionData?.fieldErrors?.username)}
						aria-errormessage={actionData?.fieldErrors?.username ? 'username-error' : undefined}
					/>
					{actionData?.fieldErrors?.username ? (
						<p className='form-validation-error' role='alert' id='username-error'>
							{actionData.fieldErrors.username}
						</p>
					) : null}
				</div>
				<div>
					<label htmlFor='password-input'>{t('password')}</label>
					<input
						id='password-input'
						name='password'
						defaultValue={actionData?.fields?.password}
						placeholder={t('passwordPlaceholder')}
						type='password'
						autoComplete='on'
						aria-invalid={Boolean(actionData?.fieldErrors?.password) || undefined}
						aria-errormessage={actionData?.fieldErrors?.password ? 'password-error' : undefined}
					/>
					{actionData?.fieldErrors?.password ? (
						<p className='form-validation-error' role='alert' id='password-error'>
							{actionData.fieldErrors.password}
						</p>
					) : null}
				</div>
				{isRegister ? (
					<div>
						<label htmlFor='role-select' className='selectLabel'>
							<select id='role-select' name='role' defaultValue=''>
								<option value='' disabled>
									{t('selectRole')}
								</option>
								<option value={Role.ADMIN}>{t('admin')}</option>
								<option value={Role.PLAYER}>{t('player')}</option>
							</select>
						</label>
						{actionData?.fieldErrors?.role ? (
							<p className='form-validation-error' role='alert' id='role-error'>
								{actionData.fieldErrors.role}
							</p>
						) : null}
					</div>
				) : null}
				<div id='form-error-message'>
					{actionData?.formError ? (
						<p className='form-validation-error' role='alert'>
							{actionData.formError}
						</p>
					) : null}
				</div>
				<button type='submit' className='button'>
					{t('submit')}
				</button>
			</Form>
		</div>
	);
}
