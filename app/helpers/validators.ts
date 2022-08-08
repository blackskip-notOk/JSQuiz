import { Role } from "@prisma/client";
import { json } from "@remix-run/node";
import { Route } from "~/constants";
import type { LoginActionData } from "~/types";

export const badRequest = (data: LoginActionData) => json(data, { status: 400 });

export function validateUsername(username: unknown, message: string) {
	if (typeof username !== 'string' || username.length < 3) {
        return message;
	}
};

export function validatePassword(password: unknown, message: string) {
	if (typeof password !== 'string' || password.length < 6) {
		return message;
	}
};

export function validateRole(role: unknown, message: string) {
	if (typeof role !== 'string' || !(role in Role)) {
		return message;
	}
};

export function validateUrl(url: any) {
	const urls = [Route.games, Route.home, Route.remix];
	if (urls.includes(url)) {
		return url;
	}
	return Route.home;
};