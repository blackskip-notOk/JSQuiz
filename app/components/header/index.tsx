import type { FC } from 'react';
import { HeaderNav } from '../headerNav';
import { Login } from '../login';
import { Logo } from '../logo';
import { TranslationToggle } from '../translationToggle';
import type { HeaderProps } from './types';

export const Header: FC<HeaderProps> = ({ className, user }) => {
	return (
		<header className={className}>
            <Logo />
			<HeaderNav />
			<TranslationToggle />
			<Login user={user} />
		</header>
	);
};
