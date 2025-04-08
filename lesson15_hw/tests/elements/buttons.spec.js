import { test, expect } from '@playwright/test';
import { Buttons } from '../../page-objects/components/elements/buttons.js';
import { Navigation } from '../../page-objects/components/navigation.js';


test.describe('demoqa.com/buttons tests', async () => {

    let navigation;
    let buttons;

    test.beforeEach(async ({page}) => {

        navigation = new Navigation(page);
        buttons = new Buttons(page);

        await navigation.navigate('https://demoqa.com/elements');
        await navigation.goToPageByItemName('buttons');
    });
    
    test('should choose Buttons, click on Double-Click-Me-Button and show related message', async ({page}) => {
        buttons.doubleClick();
        await expect(page.locator(buttons.doubleClickMessage)).toBeVisible();
    });

    test('should choose Buttons, click on Right-Click-Me-Button and show related message', async ({page}) => {
        buttons.rightClick();
        await expect(page.locator(buttons.rightClickMessage)).toBeVisible();
    });
});