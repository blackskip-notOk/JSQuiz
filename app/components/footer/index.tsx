import { useTranslation } from "react-i18next"
import { getGreetingTime } from "~/helpers/getGreetingTime";

export const handle = {
	i18n: 'footer',
};

export const Footer = () => {
    const { t } = useTranslation('footer');

    return <footer>
        <div>{t('date', { date: new Date().toLocaleString(), context: getGreetingTime() })}</div>
    </footer>
}