import React, { useRef } from 'react';
import s from './DragAndDrop.module.css';

type DragAndDropAreaProps = {
  children: React.ReactNode;
  isHighlighted?: boolean;
  onFileDrop: (file: File) => void;
  onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
};

export const DragAndDropArea: React.FC<DragAndDropAreaProps> = ({
  onFileDrop,
  isHighlighted,
  children,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}) => {
  const dragCounter = useRef(0);
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;

    if (dragCounter.current === 1) {
      if (e.dataTransfer.items.length > 0) {
        if (
          Array.from(e.dataTransfer.items).some((item) => item.kind === 'file')
        ) {
          onDragEnter?.(e);
        }
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      onDragLeave?.(e);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDragOver?.(e);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    onDrop?.(e);

    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onFileDrop(file);
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      className={`${s.area} ${isHighlighted ? s.highlight : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};
