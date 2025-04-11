import { Base } from '../../base.js';

export class RadioButton extends Base {
    constructor(page) {
        super(page);
    }

    getRadioButton(yesORimpressive) {
        return `[for="${yesORimpressive}Radio"]`;
    }

    async clickRadioButton(yesORimpressive) {
        await this.page.locator(this.getRadioButton(yesORimpressive)).click();
    }

    get resultText() {
        return '.text-success';
    }
}