import { test, expect } from '@playwright/test';

test('Successful Login Flow', async ({ page }) => {
  await page.goto('/login');
  
  await page.locator('#username').waitFor({ state: 'visible' });
  
  await page.locator('#username').fill('admin');
  await page.locator('#password').fill('password');
  
  await page.locator('button[type="submit"]').click();
  
  await page.waitForNavigation();
  
  expect(page.url()).toBe('/');
  
  const navElement = page.locator('nav');
  await expect(navElement).toBeVisible();
});