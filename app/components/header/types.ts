import type { User } from "@prisma/client";

export type HeaderProps = {
	className: string;
	user: Pick<User, 'id' | 'username'> | null;
};