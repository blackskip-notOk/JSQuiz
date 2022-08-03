import { useTranslation } from "react-i18next"
import { getGreetingTime } from "~/helpers/getGreetingTime";

export const Footer = () => {
    const { t } = useTranslation();

    return <footer>
        <div>{t('footer.date', { date: new Date().toLocaleString(), context: getGreetingTime() })}</div>
    </footer>
}