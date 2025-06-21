import { Logo } from '../Logo';
import s from './Header.module.css';
import { Menu } from './Menu';

export const Header = () => (
  <header className={s.header}>
    <Logo />
    <Menu />
  </header>
);
