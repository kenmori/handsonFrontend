import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login.html');
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByLabel('UserName必須').click();
  await page.getByLabel('UserName必須').fill('aaa');
  await page.getByText('UserName必須 E-mail必須 Password ( 8文字以上の大小英数字 )必須 利用規約に同意しました ( 規約を読むとチェックが入ります ) C').click();
  await page.getByLabel('E-mail必須').click();
  await page.getByLabel('E-mail必須').fill('moritakenji@yahoo.co.jp');
  await page.getByLabel('E-mail必須').press('Tab');
  await page.locator('#js-email-error').click();
  await page.getByLabel('Password ( 8文字以上の大小英数字 )必須').click();
  await page.screenshot({ path: "./src/playwright/error.png" })
  await page.locator('body').click();
  await page.getByText('入力してください').click();
  await page.getByLabel('E-mail必須').click();
  await page.getByLabel('E-mail必須').fill('moritakenji');
  await page.getByText('Login ▶︎ Sign Up UserName必須 E-mail必須 Password ( 8文字以上の大小英数字 )必須 入力してください 利用規約に同意').click();
  await page.getByText('メールアドレスの形式になっていません').click();
  await page.screenshot({ path: "./src/playwright/error2.png" })
  await page.getByLabel('Password ( 8文字以上の大小英数字 )必須').click();
  await page.getByLabel('Password ( 8文字以上の大小英数字 )必須').fill('Dnj4104684');
  await page.getByLabel('Password ( 8文字以上の大小英数字 )必須').press('Tab');
  await page.getByRole('button', { name: 'パスワードが表示されます' }).click();
  await page.locator('#js-checkbox-link').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByLabel('E-mail必須').click();
  await page.getByLabel('E-mail必須').fill('moritakenji@yahoo.co.jp');
  await page.getByLabel('E-mail必須').press('Tab');
  await page.getByRole('button', { name: 'パスワードを非表示にします' }).click();
  await page.getByRole('button', { name: 'Create My Account' }).click();
  await page.getByRole('link', { name: 'ログインページへ移動する' }).click();
  await page.screenshot({ path: "./src/playwright/login.png" })
  await page.locator('#userId').click();
  await page.locator('#userId').fill('moritakenji');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Dnj4104684');
  await page.getByText('User ID (Name or E-mail) Password パスワードをお忘れの方はこちら Login').click();
  await page.getByRole('button', { name: 'パスワードが表示されます' }).click();
  await page.getByRole('button', { name: 'パスワードを非表示にします' }).click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: '← Back to Login page' }).click();
  await page.locator('#userId').click();
  await page.locator('#userId').fill('moritakenji@yahoo.co.jp');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Dnj4104684');
  await page.getByText('User ID (Name or E-mail) Password パスワードをお忘れの方はこちら Login').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.screenshot({ path: "./src/playwright/login2.png" })
});