import { test, expect } from '@playwright/test';

test('login page elements are visible', async ({ page }) => {
  await page.goto('/login');

  const usernameInput = page.locator('#username');
  const passwordInput = page.locator('#password');
  const submitButton = page.locator('button[type="submit"]');
  const titleText = page.getByText('RecipeFinder');

  await expect(usernameInput).toBeVisible();
  await expect(passwordInput).toBeVisible();
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toHaveText('Sign In');
  await expect(titleText).toBeVisible();
});