import { Base } from '../../base.js';

export class Alerts extends Base {
    constructor(page) {
        super(page);
        this.expectedConfirmBoxMessage = '';
        this.expectedPromptBoxMessage = '';
    }

    get confirmBoxButton() {
        return '#confirmButton';
    }

    get promptBoxButton() {
        return '#promtButton'
    }

    get confirmBoxResult() {
        return '#confirmResult';
    }

    get confirmPromptResult() {
        return '#promptResult';
    }

    async clickHandleAndAcceptConfirmBox() {
        this.page.on('dialog', async (dialog) => {
            this.expectedConfirmBoxMessage = dialog.message();
            await dialog.accept();
        });
        await this.page.locator(this.confirmBoxButton).click();
    }

    async clickHandleAndDismissConfirmBox() {
        this.page.on('dialog', async (dialog) => {
            this.expectedConfirmBoxMessage = dialog.message();
            await dialog.dismiss();
        });
        await this.page.locator(this.confirmBoxButton).click();
    }

    async clickHandleAndAcceptPromptBox(testData) {
        this.page.on('dialog', async (dialog) => {
            this.expectedPromptBoxMessage = dialog.message();
            await dialog.accept(testData);
        });
        await this.page.locator(this.promptBoxButton).click();
    }
}