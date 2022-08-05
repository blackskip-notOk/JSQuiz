import type { FC } from 'react';
import { HeaderNav } from '../headerNav';
import { Logo } from '../logo';
import { TranslationToggle } from '../translationToggle';

type HeaderProps = {
	className: string;
};

export const Header: FC<HeaderProps> = ({ className }) => {
	return (
		<header className={className}>
            <Logo />
			<HeaderNav />
			<TranslationToggle />
		</header>
	);
};
