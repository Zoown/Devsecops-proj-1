import { test, expect, Page } from '@playwright/test';

const uniqueStreet = `Playwright Street ${Date.now()}`;
const uniqueAddress = `Playwright Address ${Date.now()}`;
const uniqueCity = "Playwright City";
const uniqueNumber = Math.floor(Math.random() * 100000);
const uniqueSize = 42;
const uniqueRent = 9999;


async function login(page : Page) {
  await page.goto('http://127.0.0.1:5173/login');
  await page.getByPlaceholder('Username').fill('a');
  await page.getByPlaceholder('Password').fill('a');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/\/admin/);
}

test('quick playwright test, homepage', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Apartments/i);
});

test('/apartments shows apartments', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/apartments');

  // Wait for at least one card to load
  await page.waitForSelector('[data-testid="apartment-listing-card"]');

  const items = page.getByTestId('apartment-listing-card');
  const count = await items.count();

  expect(count).toBeGreaterThan(1);
});

test('login', async ({ page }) => {
  await login(page);
});

test('login fails with incorrect credentials', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/login');

  // Enter wrong username or password
  await page.getByPlaceholder('Username').fill('wronguser');
  await page.getByPlaceholder('Password').fill('wrongpassword');

  await page.getByRole('button', { name: 'Login' }).click();

  // User should NOT be redirected to /admin
  await expect(page).not.toHaveURL(/\/admin/);

  // Expect an error message to appear
  await expect(page.getByText(/invalid/i)).toBeVisible();
});

test('create an apartment', async ({ page }) => {
  await login(page);

  const form = page.getByTestId('new-apartment-form');

  await form.getByTestId('new-street').fill(uniqueStreet);
  await form.getByTestId('new-address').fill(uniqueAddress);
  await form.getByTestId('new-number').fill(uniqueNumber.toString());
  await form.getByTestId('new-size').fill(uniqueSize.toString());
  await form.getByTestId('new-rent').fill(uniqueRent.toString());
  await form.getByTestId('new-city').fill(uniqueCity);

  await form.getByRole('button', { name: 'Add Apartment' }).click();

  // Verify new apartment appears in the list
  await expect(
    page.getByText(uniqueNumber.toString(), { exact: false })
  ).toBeVisible();

});

test('updates the newly created apartment', async ({ page }) => {
  await login(page);

  const card = page.getByTestId('apartment-card').filter({
    hasText: uniqueNumber.toString()
  });

  await expect(card).toBeVisible();

  await card.getByRole('button', { name: 'Edit' }).click();

  const updateForm = card.getByTestId('update-apartment-form');

  // New data to update with
  const updatedStreet = `Updated Playwright Street ${Date.now()}`;
  const updatedRent = '7777';

  await updateForm.getByPlaceholder('Street').fill(updatedStreet);
  await updateForm.getByPlaceholder('Rent Cost').fill(updatedRent);

  await updateForm.getByRole('button', { name: 'Update Apartment' }).click();

  await expect(card.getByText(updatedStreet, { exact: false })).toBeVisible();
});

test('delete the newly created test apartment', async ({ page }) => {
  await login(page);

  const card = page.getByTestId('apartment-card').filter({
    hasText: uniqueNumber.toString()
  });

  await card.getByTestId('delete-button').click();

  await expect(
    page.getByTestId('apartment-card').filter({
      hasText: uniqueNumber.toString()
    })
  ).toHaveCount(0);
});
