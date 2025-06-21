import { NavLink } from 'react-router-dom';
import analytic from '~/assets/icons/analytic.svg';
import generator from '~/assets/icons/generate.svg';
import history from '~/assets/icons/history.svg';
import s from './Menu.module.css';

export const Menu = () => (
  <nav className={s.menu}>
    <NavLink to="/" className={({ isActive }) => (isActive ? s.active : '')}>
      <div className={s.item}>
        <img src={analytic} />
        <p>CSV Аналитик</p>
      </div>
    </NavLink>
    <NavLink
      to="/generator"
      className={({ isActive }) => (isActive ? s.active : '')}
    >
      <div className={s.item}>
        <img src={generator} />
        <p>CSV Генератор</p>
      </div>
    </NavLink>
    <NavLink
      to="/history"
      className={({ isActive }) => (isActive ? s.active : '')}
    >
      <div className={s.item}>
        <img src={history} />
        <p>История</p>
      </div>
    </NavLink>
  </nav>
);
