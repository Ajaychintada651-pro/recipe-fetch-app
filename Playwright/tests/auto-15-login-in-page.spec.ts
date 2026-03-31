import { test, expect } from '@playwright/test';

test('Login page functionality', async ({ page }) => {
  await page.goto('/login');

  // Enter valid credentials
  await page.fill('input[name="username"]', 'testuser');
  await page.fill('input[name="password"]', 'password123');
  
  // Click login button
  await page.click('button[type="submit"]');

  // Assert successful login redirects to dashboard
  await expect(page).toHaveURL('/dashboard');

  // Verify user is logged in
  await expect(page.locator('//div[@class="user-profile"]')).toBeVisible();
});

test('Login page validation', async ({ page }) => {
  await page.goto('/login');

  // Attempt login with invalid credentials
  await page.fill('input[name="username"]', 'invaliduser');
  await page.fill('input[name="password"]', 'wrongpassword');
  
  await page.click('button[type="submit"]');

  // Check for error message
  const errorMessage = page.locator('.error-message');
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toContainText('Invalid credentials');
});

test('Login page empty fields validation', async ({ page }) => {
  await page.goto('/login');

  // Submit form without entering credentials
  await page.click('button[type="submit"]');

  // Check for validation errors
  await expect(page.locator('input[name="username"]:invalid')).toBeVisible();
  await expect(page.locator('input[name="password"]:invalid')).toBeVisible();
});