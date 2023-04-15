import { test, expect } from '@playwright/test';

test('have text', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await expect(page).toHaveTitle(/Sign Up/)
  // await page.screenshot({ path: "./src/playwright/login/if-sign-up-clicked.png" })
});

test('if email input fill "fafafa", error message appear', async ({ page }) => {
  await page.goto('http://localhost:3000/register.html');
  await page.getByLabel('E-mail必須').fill('fafafa');
  await page.getByLabel('E-mail必須').blur();
  await page.screenshot({ path: "./src/playwright/login/email-error-message.png" });
});


test('if riyoukiyaku clicked, modal is open', async ({ page }) => {
  await page.goto('http://localhost:3000/register.html');
  await page.locator('#js-checkbox-link').click(); // linkをclick
  await page.screenshot({ path: "./src/playwright/login/modal-open.png" });
});
