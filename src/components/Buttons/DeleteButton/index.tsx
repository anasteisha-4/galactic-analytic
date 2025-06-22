import type { FC, PropsWithChildren, SyntheticEvent } from 'react';
import trash from '~/assets/icons/trash.svg';
import s from './DeleteButton.module.css';

type DeleteButtonProps = PropsWithChildren & {
  onClick: (e: SyntheticEvent) => void;
};
export const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => (
  <button onClick={onClick} className={s.button}>
    <img src={trash} />
  </button>
);
