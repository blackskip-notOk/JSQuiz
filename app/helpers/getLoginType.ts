import { LoginType } from "~/constants";

export const getLogintype = (value: FormDataEntryValue | null) => {
	if (!value || typeof value !== 'string') {
		return null;
	}
	return value === LoginType.login ? LoginType.login : LoginType.register;
};