import { Role } from '@prisma/client';

export function getRole(value: FormDataEntryValue | null) {
	if (!value || typeof value !== 'string') {
		return null;
	}
	return value === Role.ADMIN ? Role.ADMIN : Role.PLAYER;
}
