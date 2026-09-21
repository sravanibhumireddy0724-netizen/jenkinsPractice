import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {

  await page.goto(
    'https://naveenautomationlabs.com/opencart/index.php?route=account/login'
  );

  await page.getByRole('textbox', {
    name: 'E-Mail Address'
  }).fill('qa_test@nal.com');

  await page.getByRole('textbox', {
    name: 'Password'
  }).fill('Test@123');

  await page.getByRole('button', {
    name: 'Login'
  }).click();

  await expect(page).toHaveURL(/account/);

  await page.context().storageState({
    path: authFile
  });
});