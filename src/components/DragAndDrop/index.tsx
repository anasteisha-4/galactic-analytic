import React from 'react';
import s from './DragAndDrop.module.css';

type DragAndDropAreaProps = {
  children: React.ReactNode;
  isHighlighted?: boolean;
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
};

export const DragAndDropArea: React.FC<DragAndDropAreaProps> = ({
  children,
  isHighlighted,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}) => (
  <div
    className={`${s.area} ${isHighlighted ? s.highlight : ''}`}
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
    onDragOver={onDragOver}
    onDrop={onDrop}
  >
    {children}
  </div>
);
