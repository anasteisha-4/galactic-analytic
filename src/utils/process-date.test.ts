import { processDate, processDay } from './process-date';

describe('Date processing utils', () => {
  it('форматирует дату корректно', () => {
    expect(processDate(new Date('2025-07-10T14:32:00Z'))).toBe('10.07.2025');
  });
  it('форматирует день корректно', () => {
    expect(processDay(300)).toBe('27 октября');
    expect(processDay(1)).toBe('1 января');
  });
});
