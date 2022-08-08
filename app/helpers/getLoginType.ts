import { LoginTypes } from '~/constants';

export const getLogintype = (value: FormDataEntryValue | null) => {
	if (!value || typeof value !== 'string') {
		return null;
	}
	return value === LoginTypes.login ? LoginTypes.login : LoginTypes.register;
};
