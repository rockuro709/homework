import { test, expect } from '@playwright/test';
import { testData } from '../testData.js';
import { TextBox } from '../../page-objects/components/elements/textBox.js';
import { Navigation } from '../../page-objects/components/navigation.js'; 


test.describe('demoqa.com/text-box tests', async () => {

    let navigation;
    let textBox;

    test.beforeEach(async ({page}) => {

        navigation = new Navigation(page);
        textBox = new TextBox(page);

        await navigation.navigate('https://demoqa.com/elements');
        await navigation.goToPageByItemName('textBox');
    });
    
    test('should choose Text Box, input data, submit and show submitted data in window below', async ({page}) => {
        
        await textBox.fillFieldsAndSubmit(testData.userData['fullName'], testData.userData['email'], testData.userData['currentAddress'], testData.userData['permanentAddress']);
        await expect(page.locator(textBox.fullNameSubmitted)).toHaveText(`Name:${testData.userData['fullName']}`);
        await expect(page.locator(textBox.emailSubmitted)).toHaveText(`Email:${testData.userData['email']}`);
        await expect(page.locator(textBox.currentAddressSubmitted)).toHaveText(`Current Address :${testData.userData['currentAddress']}`);
        await expect(page.locator(textBox.permanentAddressSubmitted)).toHaveText(`Permananet Address :${testData.userData['permanentAddress']}`);
    });
});