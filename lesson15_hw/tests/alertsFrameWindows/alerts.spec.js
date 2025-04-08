import { test, expect } from '@playwright/test';
import { testData } from '../testData.js';
import { Alerts } from '../../page-objects/components/alertsFrameWindows/alerts.js';
import { Navigation } from '../../page-objects/components/navigation.js'; 


test.describe('demoqa.com/alerts tests', async () => {

    let navigation;
    let alerts;

    test.beforeEach(async ({page}) => {

        navigation = new Navigation(page);
        alerts = new Alerts(page);

        await navigation.navigate('https://demoqa.com/alertsWindows');
        await navigation.goToPageByItemName('alerts');
    });

    test('should choose Alerts, click on confirm-box-button, show dialog/alert with certain message, confirm alert and show selected choice', async ({page}) => {
        await alerts.clickHandleAndAcceptConfirmBox();
        expect(alerts.expectedConfirmBoxMessage).toBe('Do you confirm action?');
        await expect(page.locator(alerts.confirmBoxResult)).toHaveText(/.+Ok/);
    });

    test('should choose Alerts, click on confirm-box-button, show dialog/alert with certain message, dismiss alert and show selected choice', async ({page}) => {
        await alerts.clickHandleAndDismissConfirmBox();
        expect(alerts.expectedConfirmBoxMessage).toBe('Do you confirm action?');
        await expect(page.locator(alerts.confirmBoxResult)).toHaveText(/.+Cancel/);
    });

    test('should choose Alerts, click on prompt-box-button, show dialog/alert with certain message, input data, confirm alert and show entered data', async ({page}) => {
        await alerts.clickHandleAndAcceptPromptBox(testData.promptData);
        expect(alerts.expectedPromptBoxMessage).toBe('Please enter your name');
        await expect(page.locator(alerts.confirmPromptResult)).toHaveText(new RegExp(`.+${testData.promptData}`));
    });

});