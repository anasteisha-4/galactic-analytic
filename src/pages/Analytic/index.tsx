import React, { useEffect, useRef } from 'react';
import { Button, ClearButton, DragAndDropArea } from '~/components';
import { useDragAndDrop } from '~/features/drag-and-drop';
import { useAnalyticStore } from '~/store';
import s from './Analytic.module.css';

export const AnalyticPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { phase, uploadedFile, handleFileSelection, resetAnalytic } =
    useAnalyticStore();

  const { isDragging, droppedFiles, dragAndDropProps, clearDroppedFiles } =
    useDragAndDrop();

  useEffect(() => {
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0];
      handleFileSelection(file);
      clearDroppedFiles();
    }
  }, [droppedFiles, handleFileSelection, clearDroppedFiles]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleClear = () => {
    resetAnalytic();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    clearDroppedFiles();
  };

  return (
    <main className={s.page}>
      <h1 className={s.title}>
        Загрузите <span className={s.bold}>csv</span> файл и получите{' '}
        <span className={s.bold}>полную информацию</span> о нём за сверхнизкое
        время
      </h1>

      {phase === 'start' && (
        <>
          <DragAndDropArea isHighlighted={isDragging} {...dragAndDropProps}>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInputChange}
              ref={fileInputRef}
              className={s.hiddenInput}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              appearance="secondary"
            >
              Загрузить файл
            </Button>
            <p>или перетащите сюда</p>
          </DragAndDropArea>
          <Button appearance="disabled">Отправить</Button>
        </>
      )}

      {phase === 'uploadError' && uploadedFile && (
        <div className={`${s.area} ${s['area-error']}`}>
          <div className={s['button-block']}>
            <Button appearance="error">{uploadedFile.name}</Button>
            <ClearButton onClick={handleClear} />
          </div>
          <p className={s['error-text']}>упс, не то...</p>
        </div>
      )}

      {phase === 'fileLoaded' && uploadedFile && (
        <>
          <div className={`${s.area} ${s['area-success']}`}>
            <div className={s['button-block']}>
              <Button appearance="file-loaded">{uploadedFile.name}</Button>
              <ClearButton onClick={handleClear} />
            </div>
            <p className={s['file-loaded-text']}>файл загружен!</p>
          </div>
          <Button>Отправить</Button>
        </>
      )}

      {(phase === 'start' ||
        phase === 'fileLoaded' ||
        phase === 'uploadError') && (
        <div className={s.highlights}>
          Здесь
          <br />
          появятся хайлайты
        </div>
      )}
    </main>
  );
};
