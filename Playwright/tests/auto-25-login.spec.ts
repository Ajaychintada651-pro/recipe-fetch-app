import { test, expect } from '@playwright/test';

test('login feature', async ({ page }) => {
  await page.goto('/login');
  
  await expect(page.locator('#username')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  
  const signInButton = page.locator('button[type="submit"]');
  await expect(signInButton).toBeVisible();
  await expect(signInButton).toHaveText('Sign In');
  
  await expect(page.getByText('RecipeFinder')).toBeVisible();
});