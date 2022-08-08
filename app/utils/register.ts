import type { LoginForm } from "~/types";
import { hash } from 'bcryptjs';
import { db } from '~/utils/db.server';

export async function register({ username, password, role }: LoginForm) {
	const passwordHash = await hash(password, 10);
	const user = await db.user.create({
		data: { username, passwordHash, role },
	});
	return { id: user.id, username };
};