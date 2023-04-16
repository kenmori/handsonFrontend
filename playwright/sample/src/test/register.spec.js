import { test, expect } from '@playwright/test';

test('if email input fill "fafafa", error message appear', async ({ page }) => {
  await page.goto('http://localhost:3000/register.html');
  await page.getByLabel('E-mail必須').fill('fafafa');
  await page.getByLabel('E-mail必須').blur();
  await page.screenshot({ path: "./src/playwright/login/email-error-message.png" });
});

test('if riyoukiyaku clicked, modal is open and exist 利用規約 text', async ({ page }) => {
  await page.goto('http://localhost:3000/register.html');
  await page.locator('#js-checkbox-link').click ();
  await expect(page.locator('#js-modal-inner')).toContainText("利用規約")
});
