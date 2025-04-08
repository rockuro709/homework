import { Base } from '../../base.js';

export class Buttons extends Base {
    constructor(page) {
        super(page);
    }

    get doubleClickButton() {
        return '#doubleClickBtn';
    }

    get rightClickButton() {
        return '#rightClickBtn';
    }

    get doubleClickMessage() {
        return '#doubleClickMessage';
    }

    get rightClickMessage() {
        return '#rightClickMessage';
    }

    async doubleClick() {
        await this.page.locator(this.doubleClickButton).dblclick();
    }

    async rightClick() {
        await this.page.locator(this.rightClickButton).click({ button: 'right' });
    }
}