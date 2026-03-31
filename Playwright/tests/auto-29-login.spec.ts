import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('#username', 'admin');
  await page.fill('#password', 'password');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/');
  await expect(page.locator('navbar, .home-content')).toBeVisible();
});

test('login with invalid credentials', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('#username', 'wronguser');
  await page.fill('#password', 'wrongpass');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/login');
  await expect(page.getByText('Invalid credentials. Use admin / password')).toBeVisible();
});