import { Theme } from '@prisma/client';

export function getQuestionTheme(value: FormDataEntryValue | null): Theme {
	// if (!value || typeof value !== 'string') {
	// 	return null;
	// }

	switch (value) {
		case Theme.HTML:
			return Theme.HTML;

		case Theme.CSS:
			return Theme.CSS;

		case Theme.JAVASCRIPT:
			return Theme.JAVASCRIPT;
		default:
			return Theme.OTHER;
	}
}
