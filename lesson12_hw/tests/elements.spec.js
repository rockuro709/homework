import { test, expect } from '@playwright/test';
import { testData } from './testdata.js';


test.describe('demoqa.com/elements tests', async () => {

    test.beforeEach(async ({page}) => {
        //добавил waitUntil, потому что индикатор загрузки почему-то крутится очень долго и приходится ждать 20 секунд лишних
        await page.goto('https://demoqa.com/elements', {waitUntil: 'domcontentloaded'});
    });
    
    test('should choose Text Box, input data, submit and show submitted data in window below', async ({page}) => {
        await page.locator('.element-group:nth-of-type(1) #item-0').click();
        await page.locator('[placeholder="Full Name"]').fill(testData.userData['fullName']);
        await page.locator('[placeholder="name@example.com"]').fill(testData.userData['email']);
        await page.locator('[placeholder="Current Address"]').fill(testData.userData['currentAddress']);
        await page.locator('#permanentAddress.form-control').fill(testData.userData['permanentAddress']);
        await page.locator('#submit').click();
        await expect(page.locator('#name.mb-1')).toHaveText(`Name:${testData.userData['fullName']}`);
        await expect(page.locator('#email.mb-1')).toHaveText(`Email:${testData.userData['email']}`);
        await expect(page.locator('#currentAddress.mb-1')).toHaveText(`Current Address :${testData.userData['currentAddress']}`);
        await expect(page.locator('#permanentAddress.mb-1')).toHaveText(`Permananet Address :${testData.userData['permanentAddress']}`);
    });

    test('should choose Radio Button, click Yes-button and show selected choice', async ({page}) => {
        await page.locator('.element-group:nth-of-type(1) #item-2').click();
        await page.locator('[for="yesRadio"]').click();
        await expect(page.locator('.mt-3')).toHaveText('You have selected Yes');
    });

    test('should choose Links, click on home-link and open new tab with url demoqa.com', async ({page}) => {
        await page.locator('.element-group:nth-of-type(1) #item-5').click();
        await page.locator('#simpleLink').click();
        const newPage = await page.waitForEvent('popup');
        await newPage.waitForLoadState('domcontentloaded');
        await expect(newPage).toHaveURL('https://demoqa.com/');
    });
});