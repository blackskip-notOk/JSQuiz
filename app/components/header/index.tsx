import type { FC } from 'react';
import { HeaderNav } from '../headerNav';
import { Login } from '../login';
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
			<Login />
		</header>
	);
};
