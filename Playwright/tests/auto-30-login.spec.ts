import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('/login');
  
  await page.fill('#username', 'admin');
  await page.fill('#password', 'password');
  
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('/');
  
  const navbarContent = await page.locator('nav');
  const homeContent = await page.locator('main');
  
  await expect(navbarContent).toBeVisible();
  await expect(homeContent).toBeVisible();
});