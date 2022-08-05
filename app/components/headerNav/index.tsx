import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { Route } from "~/constants";
import stylesUrl from './style.css';

export function links() {
	return [{ rel: 'stylesheet', href: stylesUrl }];
}

export const handle = {
	i18n: 'header',
};

export const HeaderNav = () => {
    const { t } = useTranslation('header');
	return (
		<nav>
			<ul className="linksList">
				<li className="linkItem">
					<Link to={Route.rules} className="link">{t('link.rules')}</Link>
				</li>
				<li className="linkItem">
					<Link to={Route.games} className="link">{t('link.results')}</Link>
				</li>
				<li className="linkItem">
					<Link to={Route.play} className="link">{t('link.newGame')}</Link>
				</li>
			</ul>
		</nav>
	);
};
