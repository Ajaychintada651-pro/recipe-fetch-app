import { test, expect } from '@playwright/test';

test('Login Page - Successful Login', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'password');
  
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('text=Find Your Next Favorite Recipe')).toBeVisible();
});