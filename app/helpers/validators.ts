import { LoginTypes } from './../constants/index';
import type { LoginType } from '~/constants';
import { Role } from '@prisma/client';
import { json } from '@remix-run/node';
import { Route } from '~/constants';
import type { LoginActionData } from '~/types';

export function badRequest(data: LoginActionData) {
	return json(data, { status: 400 });
}

export function validateUsername(username: unknown, message: string) {
	if (typeof username !== 'string' || username.length < 3) {
		return message;
	}
}

export function validatePassword(password: unknown, message: string) {
	if (typeof password !== 'string' || password.length < 6) {
		return message;
	}
}

export function validateRole(role: unknown, loginType: LoginType, message: string) {
	if ((typeof role !== 'string' || !(role in Role)) && loginType === LoginTypes.register) {
		return message;
	}
}

export function validateUrl(url: any) {
	const urls = [Route.games, Route.home, Route.remix];
	if (urls.includes(url)) {
		return url;
	}
	return Route.home;
}
