import { Base } from '../../base.js';

export class TextBox extends Base {
    constructor(page) {
        super(page);
    }

    get fullNameField() {
        return '[placeholder="Full Name"]';
    }

    get emailField() {
        return '[placeholder="name@example.com"]';
    }

    get currentAddressField() {
        return '[placeholder="Current Address"]';
    }

    get permanentAddressField() {
        return '#permanentAddress.form-control';
    }

    get fullNameSubmitted() {
        return '#name.mb-1';
    }

    get emailSubmitted() {
        return '#email.mb-1';
    }

    get currentAddressSubmitted() {
        return '#currentAddress.mb-1';
    }

    get permanentAddressSubmitted() {
        return '#permanentAddress.mb-1';
    }

    get submitButton() {
        return '#submit';
    }
    
    async fillFieldsAndSubmit(fullName, email, currentAddress, permanentAddress) {
        await this.page.locator(this.fullNameField).fill(fullName);
        await this.page.locator(this.emailField).fill(email);
        await this.page.locator(this.currentAddressField).fill(currentAddress);
        await this.page.locator(this.permanentAddressField).fill(permanentAddress);
        await this.page.locator(this.submitButton).click();
    }

}