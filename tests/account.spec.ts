import { test, expect } from '@playwright/test';

test.use({
    storageState: 'playwright/.auth/user.json'
});

test('verify account page', async ({ page }) => {

    await page.goto(
        'https://naveenautomationlabs.com/opencart/index.php?route=account/account'
    );

    await expect(
        page.getByRole('link',{name:'Edit Account'})
    ).toBeVisible();

});