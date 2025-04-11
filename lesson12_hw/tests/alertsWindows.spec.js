import { test, expect } from '@playwright/test';
import { testData } from './testdata.js';


test.describe('demoqa.com/alertsWindows tests', async () => {

    test.beforeEach(async ({page}) => {
        //добавил waitUntil, потому что индикатор загрузки почему-то крутится очень долго и приходится ждать 20 секунд лишних
        await page.goto('https://demoqa.com/alertsWindows', {waitUntil: 'domcontentloaded'});
    });

    test('should choose Alerts, click on confirm-box-button, show dialog/alert with certain message, confirm alert and show selected choice', async ({page}) => {
        await page.locator('.element-group:nth-of-type(3) #item-1').click();
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('Do you confirm action?'); 
            await dialog.accept();
        });
        await page.locator('#confirmButton').click();
        await expect(page.locator('#confirmResult')).toHaveText(/.+Ok/);
    });

    test('should choose Alerts, click on prompt-box-button, show dialog/alert with certain message, input data, confirm alert and show entered data', async ({page}) => {
        await page.locator('.element-group:nth-of-type(3) #item-1').click();
        page.on('dialog', async (dialog) => {
            expect(dialog.message()).toBe('Please enter your name'); 
            await dialog.accept(testData.promptData);
        });
        await page.locator('#promtButton').click();
        await expect(page.locator('#promptResult')).toHaveText(new RegExp(`.+${testData.promptData}`));
    });

});