import logo from '~/assets/icons/Logo SS.svg';
import s from './Logo.module.css';

export const Logo = () => (
  <div className={s.logo}>
    <img src={logo} />
    <div className={s.name}>Межгалактическая аналитика</div>
  </div>
);
