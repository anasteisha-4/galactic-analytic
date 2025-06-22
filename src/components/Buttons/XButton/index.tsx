import type { FC, SyntheticEvent } from 'react';
import s from './XButton.module.css';

type XButtonProps = {
  onClick?: (e: SyntheticEvent) => void;
};

export const XButton: FC<XButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className={s.button} />
);
