import { test, expect } from '@playwright/test';

test('User successfully logs in and is redirected to dashboard', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Test@123');
  
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('.welcome-message')).toBeVisible();
});