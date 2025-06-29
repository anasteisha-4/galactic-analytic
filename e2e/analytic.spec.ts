import { expect, test } from '@playwright/test';

test('Пользователь может загрузить валидный CSV, получить аналитику и увидеть запись в истории', async ({
  page,
}) => {
  await page.goto('/');

  await page.setInputFiles('input[type="file"]', 'e2e/fixtures/valid.csv');

  const sendButton = page.getByRole('button', { name: /отправить/i });
  await expect(sendButton).toBeEnabled();
  await sendButton.click();

  await expect(
    page.getByText(/общие расходы в галактических кредитах/i),
  ).toBeVisible();

  await page.getByRole('link', { name: /история/i }).click();

  await expect(page.getByText(/valid\.csv/i)).toBeVisible();

  await page.getByText(/valid\.csv/i).click();
  await expect(
    page.getByText(/общие расходы в галактических кредитах/i),
  ).toBeVisible();
});
