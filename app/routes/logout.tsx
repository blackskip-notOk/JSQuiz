import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Route } from '~/constants';
import { logout } from '~/utils/login';

export const action: ActionFunction = async ({ request }) => {
	return logout(request);
};

export const loader: LoaderFunction = async () => {
	return redirect(Route.home);
};
