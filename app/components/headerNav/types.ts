import type { getUser } from "~/utils/getUser";

export type LoaderData = {
	user: Awaited<ReturnType<typeof getUser>>;
};