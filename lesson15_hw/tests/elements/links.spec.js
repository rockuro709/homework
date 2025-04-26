import { test, expect } from '@playwright/test';
import { Links } from '../../page-objects/components/elements/links.js';
import { Navigation } from '../../page-objects/components/navigation.js'; 


test.describe('demoqa.com/links tests', async () => {

    let navigation;
    let links;

    test.beforeEach(async ({page}) => {

        navigation = new Navigation(page);
        links = new Links(page);

        await navigation.navigate('https://demoqa.com/elements');
        await navigation.goToPageByItemName('links');
    });
    
    test('should choose Links, click on home-link and open new tab with url demoqa.com', async ({page}) => {

        const newPage = await links.clickAndWaitForNewPage();
        await expect(newPage).toHaveURL('https://demoqa.com/');
    });
});