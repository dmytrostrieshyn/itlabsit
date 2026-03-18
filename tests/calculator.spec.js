import { test, expect } from '@playwright/test';

test('Успішний розрахунок резистора', async ({ page }) => {
  // 1. Відкриваємо наш локальний сайт
  await page.goto('http://localhost:5173/');

  // 2. Вписуємо дані у поля форми
  await page.fill('[data-testid="input-source"]', '5');
  await page.fill('[data-testid="input-led-v"]', '2.2');
  await page.fill('[data-testid="input-led-i"]', '20');

  // 3. Натискаємо кнопку розрахунку
  await page.click('[data-testid="calc-btn"]');

  // 4. Перевіряємо, чи з'явився правильний результат на екрані
  const resultMessage = page.locator('[data-testid="result-message"]');
  await expect(resultMessage).toBeVisible();
  await expect(resultMessage).toContainText('140 Ом');
});