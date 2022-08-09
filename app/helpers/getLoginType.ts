import { LoginTypes } from '~/constants';

export function getLogintype(value: FormDataEntryValue | null) {
	if (!value || typeof value !== 'string') {
		return null;
	}
	return value === LoginTypes.login ? LoginTypes.login : LoginTypes.register;
};
