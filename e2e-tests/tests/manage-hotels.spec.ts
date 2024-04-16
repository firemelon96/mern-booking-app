import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = 'http://localhost:5173';

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  //get the sign in button
  await page.getByRole('link', { name: 'Sign In' }).click();

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  await page.locator('[name=email]').fill('e@e.com');

  await page.locator('[name=password]').fill('password');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByText('Signin successful')).toBeVisible();
});

test('Should allow user to add a hotel', async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);

  await page.locator('[name="name"]').fill('Test Hotel');
  await page.locator('[name="city"]').fill('Test City');
  await page.locator('[name="country"]').fill('Test Country');
  await page
    .locator('[name="description"]')
    .fill('This is a description for our hotel test');
  await page.locator('[name="pricePerNight"]').fill('100');
  await page.selectOption('select[name="starRating"]', '3');
  await page.getByText('Budget').click();
  await page.getByLabel('Free WiFi').check();
  await page.getByLabel('Parking').check();

  await page.locator('[name="adultCount"]').fill('2');
  await page.locator('[name="childCount"]').fill('4');

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'files', 'profile1.jpg'),
    path.join(__dirname, 'files', 'profile2.jpg'),
  ]);

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Hotel saved!')).toBeVisible();
});

test('should display hotels', async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);
  //   await page.goto(`${UI_URL}/add-hotel`);

  await expect(
    page.getByRole('heading', { name: 'Condo hotel' })
  ).toBeVisible();
  await expect(page.getByText('Lorem ipsum dolor sit amet')).toBeVisible();
  await expect(page.getByText('paranaque, Manila')).toBeVisible();
  await expect(page.getByText('Family')).toBeVisible();
  await expect(page.getByText('PHP230 per night')).toBeVisible();
  await expect(page.getByText('2 adults, 2 children')).toBeVisible();
  await expect(page.getByText('Star Rating').nth(2)).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'View Details' }).nth(2)
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible();
});

test('should edit hotel', async ({ page }) => {
  await page.goto(`${UI_URL}/my-hotels`);

  await page.getByRole('link', { name: 'View Details' }).nth(0).click();

  await page.waitForSelector('[name="name"]', { state: 'attached' });

  await expect(page.locator('[name="name"]')).toHaveValue('Condo hotel');

  await page.locator('[name="name"]').fill('Condo hotel UPDATED');

  await page.getByRole('button', { name: 'Save' }).click();

  await expect(page.getByText('Updated successfully')).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    'Condo hotel UPDATED'
  );

  await page.locator('[name="name"]').fill('Condo hotel');

  await page.getByRole('button', { name: 'Save' }).click();
});
