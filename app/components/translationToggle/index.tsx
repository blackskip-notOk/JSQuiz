import { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '~/i18n/types';
import { languages } from '~/i18n/types';
import stylesUrl from './styles.css';

export function links() {
	return [{ rel: 'stylesheet', href: stylesUrl }];
}

export const TranslationToggle = () => {
	const { i18n } = useTranslation();

	const [isOpen, toggleIsOpen] = useReducer((isOpen) => !isOpen, true);

	const activeLng = Object.keys(languages).find(
		(lng: Language) => i18n.resolvedLanguage === lng,
	) as Language | undefined;

	const lang = Object.keys(languages).map((lng: Language) => {
		const handleToggle = () => {
			i18n.changeLanguage(lng);
			toggleIsOpen();
		};

		return (
			<li key={lng} role='menuitem'>
				<button onClick={handleToggle} className='lngButton'>
					<span className='nativeName'>
						<img className='flag' src={`/images/flags/${lng}.png`} alt={`flag ${lng}`} />
						{languages[lng].nativeName}
					</span>
				</button>
			</li>
		);
	});

	const handleToggleMenu = () => {
		toggleIsOpen();
	};

	const lngMenuClassName = `lngMenu ${isOpen ? 'lngMenu_open' : 'lngMenu_close'}`;

	return (
		<div className='lngContainer'>
			{activeLng ? (
				<button onClick={handleToggleMenu} className='activeLngButton' aria-haspopup='menu'>
					<div className='activeLng'>
						<img
							className='flag'
							src={`/images/flags/${activeLng}.png`}
							alt={`flag ${activeLng}`}
						/>
						<span className='activeNativeName'>{languages[activeLng].nativeName}</span>
					</div>
				</button>
			) : null}
			<ul className={lngMenuClassName} role='menu' aria-labelledby='language-menu-button'>
				{lang}
			</ul>
		</div>
	);
};
