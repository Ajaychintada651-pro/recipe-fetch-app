import { test, expect } from '@playwright/test';

test('login page functionality', async ({ page }) => {
  // Navigate to the login page
  await page.goto('/login');

  // Verify login form elements are present
  await expect(page.getByLabel('Username')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

  // Perform successful login
  await page.getByLabel('Username').fill('validuser');
  await page.getByLabel('Password').fill('validpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify successful login redirects to dashboard
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Welcome, User')).toBeVisible();

  // Test invalid login credentials
  await page.goto('/login');
  await page.getByLabel('Username').fill('invaliduser');
  await page.getByLabel('Password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify error message for invalid credentials
  await expect(page.getByText('Invalid username or password')).toBeVisible();
});