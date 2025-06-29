import { isAnalyticResults } from './is-analytic-results';

describe('isAnalyticResults (type guard)', () => {
  it('распознаёт валидный объект', () => {
    expect(
      isAnalyticResults({
        total_spend_galactic: 1,
        rows_affected: 1,
        less_spent_at: 1,
        big_spent_civ: 'humans',
        less_spent_civ: 'blobs',
        big_spent_at: 1,
        big_spent_value: 1,
        average_spend_galactic: 1,
      }),
    ).toBe(true);
  });

  it('отклоняет невалидный объект', () => {
    expect(isAnalyticResults({})).toBe(false);
    expect(isAnalyticResults(null)).toBe(false);
    expect(isAnalyticResults({ total_spend_galactic: 'not a number' })).toBe(
      false,
    );
  });
});
