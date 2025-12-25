import { test, expect } from '@playwright/test';

test('quick playwright test, homepage', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Apartments/i);
});
