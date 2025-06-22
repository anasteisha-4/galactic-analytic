import { useCallback, useRef, useState } from 'react';

export const useDragAndDrop = (
  onFilesDroppedCallback?: (files: File[]) => void,
) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;

    if (dragCounter.current === 1 && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      if (e.dataTransfer.files.length > 0) {
        const filesArray = Array.from(e.dataTransfer.files);
        setDroppedFiles(filesArray);
        onFilesDroppedCallback?.(filesArray);
        e.dataTransfer.clearData();
      }
    },
    [onFilesDroppedCallback],
  );

  const clearDroppedFiles = useCallback(() => {
    setDroppedFiles([]);
  }, []);

  return {
    isDragging,
    droppedFiles,
    dragAndDropProps: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
    clearDroppedFiles,
  };
};
