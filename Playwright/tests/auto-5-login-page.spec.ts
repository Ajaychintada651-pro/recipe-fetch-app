import { test, expect } from '@playwright/test';

test('Login Page Functionality', async ({ page }) => {
  // Navigate to login page
  await page.goto('/login');

  // Enter email and password
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Test@123');

  // Click login button
  await page.click('button[type="submit"]');

  // Check redirection to dashboard
  await expect(page).toHaveURL('/dashboard');

  // Verify welcome message is visible
  const welcomeMessage = await page.locator('.welcome-message');
  await expect(welcomeMessage).toBeVisible();
});