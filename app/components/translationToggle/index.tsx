import { useTranslation } from 'react-i18next';
import type { Language } from '~/i18n/types';
import { languages } from '~/i18n/types';
import stylesUrl from './styles.css';

export function links() {
	return [{ rel: 'stylesheet', href: stylesUrl }];
}

export const TranslationToggle = () => {
	const { i18n } = useTranslation();

	return (
		<div className='toggleContainer'>
			{Object.keys(languages).map((lng: Language) => (
				<button
					key={lng}
					style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
					className='button'
					type='submit'
					onClick={() => i18n.changeLanguage(lng)}
				>
					<img src="https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_Australia.png" alt='flag'/>
					<span className='span'>{languages[lng].nativeName}</span>
				</button>
			))}
		</div>
	);
};
