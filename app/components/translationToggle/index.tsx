import { useTranslation } from 'react-i18next';
import type { Language } from '~/i18n/types';
import { languages } from '~/i18n/types';

export const TranslationToggle = () => {
	const { i18n } = useTranslation();

	return (
		<div>
			{/* {Object.keys(languages).map((lng: Language) => (
				<button
					key={lng}
					style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
					type='submit'
					onClick={() => i18n.changeLanguage(lng)}
				>
					{languages[lng].nativeName}
				</button>
			))} */}
		</div>
	);
};
