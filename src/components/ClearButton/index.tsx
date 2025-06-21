import type { FC, SyntheticEvent } from 'react';
import s from './ClearButton.module.css';

type ClearButtonProps = {
  onClick?: (e: SyntheticEvent) => void;
};

export const ClearButton: FC<ClearButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className={s.clear} />
);
