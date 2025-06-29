import { processNameLength } from './process-name-length';

describe('processNameLength', () => {
  it('возвращает строку без изменений, если длина <= 20', () => {
    expect(processNameLength('shortname.csv')).toBe('shortname.csv');
    expect(processNameLength('12345678901234567890')).toBe(
      '12345678901234567890',
    );
  });

  it('обрезает строку и добавляет ... если длина > 20', () => {
    expect(processNameLength('averyveryverylongfilename.csv')).toBe(
      'averyveryverylon...',
    );
    expect(processNameLength('1234567890123456789012345')).toBe(
      '1234567890123456...',
    );
  });

  it('корректно работает с пустой строкой', () => {
    expect(processNameLength('')).toBe('');
  });

  it('корректно работает с длиной ровно 21', () => {
    expect(processNameLength('123456789012345678901')).toBe(
      '1234567890123456...',
    );
  });
});
