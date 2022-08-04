import type { FC } from "react";
import { useTranslation } from "react-i18next"
import { getGreetingTime } from "~/helpers/getGreetingTime";

export const handle = {
	i18n: 'footer',
};

type FooterProps = {
    className: string;
};

export const Footer: FC<FooterProps> = ({ className }) => {
    const { t } = useTranslation('footer');

    return <footer className={className}>
        <div>{t('date', { date: new Date().toLocaleString(), context: getGreetingTime() })}</div>
    </footer>
}