import { test, expect } from '@playwright/test';
import { RadioButton } from '../../page-objects/components/elements/radioButton.js';
import { Navigation } from '../../page-objects/components/navigation.js'; 


test.describe('demoqa.com/radio-button tests', async () => {

    let navigation;
    let radioButton;

    test.beforeEach(async ({page}) => {

        navigation = new Navigation(page);
        radioButton = new RadioButton(page);

        await navigation.navigate('https://demoqa.com/elements');
        await navigation.goToPageByItemName('radioButton');
    });
    
    test('should choose Radio Button, click Yes-button and show selected choice', async ({page}) => {

        await radioButton.clickRadioButton('yes');
        await expect(page.locator(radioButton.resultText)).toHaveText('Yes');
    });

    test('should choose Radio Button, click Impressive-button and show selected choice', async ({page}) => {

        await radioButton.clickRadioButton('impressive');
        await expect(page.locator(radioButton.resultText)).toHaveText('Impressive');
    });
});

