import type { FC, PropsWithChildren, SyntheticEvent } from 'react';
import s from './Button.module.css';

export type ButtonAppearance =
  | 'default'
  | 'secondary'
  | 'loading'
  | 'error'
  | 'success'
  | 'disabled'
  | 'file-loaded';

type ButtonProps = PropsWithChildren & {
  onClick?: (e: SyntheticEvent) => void;
  appearance?: ButtonAppearance;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  appearance,
  disabled,
}) => (
  <button
    className={s.button + ' ' + s[appearance ?? 'default']}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
