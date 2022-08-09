import type { User } from "@prisma/client";

export type LoginProps = {
    user: Pick<User, 'id' | 'username'> | null;
}