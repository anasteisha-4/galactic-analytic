import React, { useEffect, useRef } from 'react';
import loader from '~/assets/icons/loading.svg';
import {
  AnalyticResult,
  Button,
  ClearButton,
  DragAndDropArea,
} from '~/components';
import { useDragAndDrop } from '~/features/drag-and-drop';
import { useAnalyticStore } from '~/store';
import { processNameLength } from '~/utils/process-name-length';
import s from './Analytic.module.css';
import { isAnalyticResults } from '~/utils/is-analytic-results';

export const AnalyticPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    phase,
    uploadedFile,
    analyticResults,
    handleFileSelection,
    processAnalytics,
    resetAnalytic,
  } = useAnalyticStore();

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

  const handleStartAnalytics = () => {
    if (uploadedFile) {
      processAnalytics(uploadedFile);
    }
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
            <p className={s['default-text']}>или перетащите сюда</p>
          </DragAndDropArea>
          <Button appearance="disabled">Отправить</Button>
        </>
      )}

      {(phase === 'uploadError' || phase === 'parsingError') &&
        uploadedFile !== null && (
          <div className={`${s.area} ${s['area-error']}`}>
            <div className={s['button-block']}>
              <Button appearance="error">
                {processNameLength(uploadedFile.name)}
              </Button>
              <ClearButton onClick={handleClear} />
            </div>
            <p className={s['error-text']}>упс, не то...</p>
          </div>
        )}

      {phase === 'fileLoaded' && uploadedFile !== null && (
        <>
          <div className={`${s.area} ${s['area-success']}`}>
            <div className={s['button-block']}>
              <Button appearance="file-loaded">
                {processNameLength(uploadedFile.name)}
              </Button>
              <ClearButton onClick={handleClear} />
            </div>
            <p className={s['default-text']}>файл загружен!</p>
          </div>
          <Button onClick={handleStartAnalytics}>Отправить</Button>
        </>
      )}

      {phase === 'parsing' && (
        <div className={s['with-analytic']}>
          <div className={`${s.area} ${s['area-parsing']}`}>
            <div className={s['loading-content']}>
              <Button appearance="loading">
                <img src={loader} />
              </Button>
              <p className={s['default-text']}>идёт парсинг файла</p>
            </div>
          </div>

          {isAnalyticResults(analyticResults) && (
            <AnalyticResult analyticResults={analyticResults} />
          )}
        </div>
      )}

      {phase === 'analyticComplete' && uploadedFile !== null && (
        <div className={s['with-analytic']}>
          <div className={`${s.area} ${s['area-success']}`}>
            <div className={s['button-block']}>
              <Button appearance="success">
                {processNameLength(uploadedFile.name)}
              </Button>
              <ClearButton onClick={handleClear} />
            </div>
            <p className={s['default-text']}>готово!</p>
          </div>

          {analyticResults !== null && (
            <AnalyticResult analyticResults={analyticResults} />
          )}
        </div>
      )}

      {(phase === 'start' ||
        phase === 'fileLoaded' ||
        phase === 'uploadError' ||
        phase === 'parsingError') && (
        <div className={s.highlights}>
          Здесь
          <br />
          появятся хайлайты
        </div>
      )}
    </main>
  );
};
