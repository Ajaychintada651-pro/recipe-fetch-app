import { test, expect } from '@playwright/test';

test('Successful Login Flow', async ({ page }) => {
  await page.goto('/login');
  
  await page.waitForSelector('#username', { state: 'visible' });
  
  await page.fill('#username', 'admin');
  await page.fill('#password', 'password');
  
  await page.click('button[type="submit"]');
  
  await page.waitForNavigation();
  
  expect(page.url()).toBe('/');
});