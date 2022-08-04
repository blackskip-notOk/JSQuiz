import { useTranslation } from 'react-i18next';
import { Flag } from '~/constants';
import type { Language } from '~/i18n/types';
import { languages } from '~/i18n/types';
import stylesUrl from './styles.css';

export function links() {
	return [{ rel: 'stylesheet', href: stylesUrl }];
}

export const TranslationToggle = () => {
	const { i18n } = useTranslation();

	const language = Object.keys(languages).map((lng: Language) => {
		const isLng = i18n.resolvedLanguage === lng;
		const handleToggle = () => i18n.changeLanguage(lng);

		return (
			<button
				key={lng}
				style={{ fontWeight: isLng ? 'bold' : 'normal', color: isLng ? 'whitesmoke' : 'gray' }}
				className='toggle'
				type='submit'
				onClick={handleToggle}
			>
				<img
					className='flag'
					src={`https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/${Flag[lng]}.png`}
					alt='flag'
				/>
				<span className='nativeName'>{languages[lng].nativeName}</span>
			</button>
		);
	});

	return <div className='toggleContainer'>{language}</div>;
};
