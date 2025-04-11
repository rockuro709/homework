import { Base } from '../../base.js';

export class Links extends Base {
    constructor(page) {
        super(page);
    }

    get simpleLink() {
        return '#simpleLink';
    }

    async clickAndWaitForNewPage() {
        await this.page.locator(this.simpleLink).click();
        const newPage = await this.page.waitForEvent('popup');
        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }
}