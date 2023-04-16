import { test, expect } from '@playwright/test';

test('have text', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await expect(page).toHaveTitle(/Sign Up/)
});
