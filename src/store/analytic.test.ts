import { act } from '@testing-library/react';
import { aggregate } from '~/api/aggregate';
import { useHistoryStore } from './history';

jest.mock('~/config', () => ({
  BASE_URL: 'http://localhost:3000',
}));

jest.mock('~/api/aggregate', () => ({
  aggregate: jest.fn(),
}));

const addHistoryEntryMock = jest.fn();
beforeEach(() => {
  useHistoryStore.setState({ addHistoryEntry: addHistoryEntryMock });
  useAnalyticStore.getState().resetAnalytic();
  jest.clearAllMocks();
});

import { useAnalyticStore } from './analytic';

describe('useAnalyticStore', () => {
  beforeEach(() => {
    useAnalyticStore.getState().resetAnalytic();
    jest.clearAllMocks();
  });

  it('устанавливает файл и фазу fileLoaded', async () => {
    const file = new File(
      ['id,civ,developer_id,date,spend\n1,humans,1,200,100'],
      'test.csv',
      { type: 'text/csv' },
    );
    await act(
      async () => await useAnalyticStore.getState().handleFileSelection(file),
    );
    expect(useAnalyticStore.getState().phase).toBe('fileLoaded');
    expect(useAnalyticStore.getState().uploadedFile?.name).toBe('test.csv');
  });

  it('отклоняет невалидный csv', async () => {
    const file = new File(['id,name,surname,date\n1,2,3,4'], 'invalid.csv', {
      type: 'text/csv',
    });
    await act(
      async () => await useAnalyticStore.getState().handleFileSelection(file),
    );
    expect(useAnalyticStore.getState().phase).toBe('uploadError');
    expect(useAnalyticStore.getState().uploadedFile?.name).toBe('invalid.csv');
  });

  it('отклоняет невалидный файл', async () => {
    const file = new File(['not a csv'], 'bad.txt', { type: 'text/plain' });
    await act(
      async () => await useAnalyticStore.getState().handleFileSelection(file),
    );
    expect(useAnalyticStore.getState().phase).toBe('uploadError');
    expect(useAnalyticStore.getState().uploadedFile?.name).toBe('bad.txt');
  });

  it('сбрасывает состояние при resetAnalytic', () => {
    useAnalyticStore.setState({
      phase: 'fileLoaded',
      uploadedFile: new File(['test'], 'test.csv', { type: 'text/csv' }),
      analyticResults: {
        total_spend_galactic: 1,
        rows_affected: 1,
        less_spent_at: 1,
        big_spent_civ: 'humans',
        less_spent_civ: 'blobs',
        big_spent_at: 1,
        big_spent_value: 1,
        average_spend_galactic: 1,
      },
    });
    useAnalyticStore.getState().resetAnalytic();
    expect(useAnalyticStore.getState().phase).toBe('start');
    expect(useAnalyticStore.getState().uploadedFile).toBeNull();
  });

  it('handleFileSelection корректно работает с пустым файлом', async () => {
    const file = new File([''], 'empty.csv', { type: 'text/csv' });
    await act(async () => {
      await useAnalyticStore.getState().handleFileSelection(file);
    });
    expect(useAnalyticStore.getState().phase).toBe('uploadError');
  });

  it('handleFileSelection корректно работает с файлом без заголовков', async () => {
    const file = new File(['\n1,2,3,4'], 'noheaders.csv', { type: 'text/csv' });
    await act(async () => {
      await useAnalyticStore.getState().handleFileSelection(file);
    });
    expect(useAnalyticStore.getState().phase).toBe('uploadError');
  });

  it('handleFileSelection корректно работает с файлом длиной больше 20 символов в названии', async () => {
    const file = new File(
      ['id,civ,developer_id,date,spend\n1,humans,1,200,100'],
      'averyveryverylongfilename.csv',
      { type: 'text/csv' },
    );
    await act(async () => {
      await useAnalyticStore.getState().handleFileSelection(file);
    });
    expect(useAnalyticStore.getState().phase).toBe('fileLoaded');
    expect(useAnalyticStore.getState().uploadedFile?.name).toBe(
      'averyveryverylongfilename.csv',
    );
  });

  it('processAnalytics: успешный сценарий', async () => {
    const mockRead = jest
      .fn()
      .mockResolvedValueOnce({
        done: false,
        value: new TextEncoder().encode(
          '{"total_spend_galactic":1,"rows_affected":1,"less_spent_at":1,"big_spent_civ":"humans","less_spent_civ":"blobs","big_spent_at":1,"big_spent_value":1,"average_spend_galactic":1}\n',
        ),
      })
      .mockResolvedValueOnce({
        done: true,
        value: undefined,
      });

    (aggregate as jest.Mock).mockResolvedValue({
      read: mockRead,
    });

    const file = new File(
      ['id,civ,developer_id,date,spend\n1,humans,1,200,100'],
      'test.csv',
      { type: 'text/csv' },
    );

    await act(async () => {
      await useAnalyticStore.getState().processAnalytics(file);
    });

    expect(useAnalyticStore.getState().phase).toBe('analyticComplete');
    expect(
      useAnalyticStore.getState().analyticResults?.total_spend_galactic,
    ).toBe(1);
    expect(addHistoryEntryMock).toHaveBeenCalled();
  });

  it('processAnalytics: ошибка', async () => {
    (aggregate as jest.Mock).mockRejectedValue(new Error('network error'));

    const file = new File(
      ['id,civ,developer_id,date,spend\n1,humans,1,200,100'],
      'test.csv',
      { type: 'text/csv' },
    );

    await act(async () => {
      await useAnalyticStore.getState().processAnalytics(file);
    });

    expect(useAnalyticStore.getState().phase).toBe('parsingError');
    expect(useAnalyticStore.getState().analyticResults).toBeNull();
  });

  it('processAnalytics: ошибка парсинга', async () => {
    (aggregate as jest.Mock).mockResolvedValue({
      read: jest
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode('not a json\n'),
        })
        .mockResolvedValueOnce({
          done: true,
          value: undefined,
        }),
    });

    const file = new File(
      ['id,civ,developer_id,date,spend\n1,humans,1,200,100'],
      'test.csv',
      { type: 'text/csv' },
    );

    await act(async () => {
      await useAnalyticStore.getState().processAnalytics(file);
    });

    expect(useAnalyticStore.getState().phase).toBe('parsingError');
    expect(useAnalyticStore.getState().analyticResults).toBeNull();
  });

  it('processAnalytics: выбрасывает ошибку и пишет в историю', async () => {
    (aggregate as jest.Mock).mockRejectedValue(new Error('network error'));

    const file = new File(
      ['id,civ,developer_id,date,spend\n1,humans,1,200,100'],
      'test.csv',
      { type: 'text/csv' },
    );

    await act(async () => {
      await useAnalyticStore.getState().processAnalytics(file);
    });

    expect(useAnalyticStore.getState().phase).toBe('parsingError');
    expect(useAnalyticStore.getState().analyticResults).toBeNull();
    expect(addHistoryEntryMock).toHaveBeenCalled(); // Проверяем, что запись об ошибке добавлена в историю
  });
});
