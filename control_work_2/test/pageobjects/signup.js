import Base from "./base.js";
import SignupLogin from "./signupLogin.js";

class Signup extends Base {
    get titleMrRadioButton() { return $('#uniform-id_gender1'); }
    get titleMrsRadioButton() { return $('#uniform-id_gender2'); }
    get nameField() { return $('[data-qa="name"]'); }
    get emailField() { return $('[data-qa="email"]'); }
    get passwordField() { return $('[data-qa="password"]'); }
    get dayOfBirthDropdown() { return $('[data-qa="days"]'); }
    get monthOfBirthDropdown() { return $('[data-qa="months"]'); }
    get yearOfBirthDropdown() { return $('[data-qa="years"]'); }
    get newsletterCheckbox() { return $('#newsletter'); }
    get specialOffersCheckbox() { return $('#optin'); }
    get firstNameField() { return $('[data-qa="first_name"]'); }
    get lastNameField() { return $('[data-qa="last_name"]'); }
    get companyField() { return $('[data-qa="company"]'); }
    get addressField() { return $('[data-qa="address"]'); }
    get address2Field() { return $('[data-qa="address2"]'); }
    get countryDropdown() { return $('[data-qa="country"]'); }
    get stateField() { return $('[data-qa="state"]'); }
    get cityField() { return $('[data-qa="city"]'); }
    get zipcodeField() { return $('[data-qa="zipcode"]'); }
    get mobileNumberField() { return $('[data-qa="mobile_number"]'); }
    
    get createAccountButton() { return $('[data-qa="create-account"]'); }
    get continueButton() { return $('[data-qa="continue-button"]'); }
    // continueButton дублируется в Header и Signup, но используется только в двух местах, отдельный файл не нужен

    async createNewAccount(userData) {
        
        await SignupLogin.newUserSignup(userData);
        await this.titleMrRadioButton.waitForDisplayed();

        if (userData.title === 'Mr') {
            await this.titleMrRadioButton.click();
        } else if (userData.title === 'Mrs') {
            await this.titleMrsRadioButton.click();
        }

        await this.passwordField.setValue(userData.password);

        if (userData.dayOfBirth && userData.monthOfBirth && userData.yearOfBirth) {
            await this.dayOfBirthDropdown.selectByVisibleText(userData.dayOfBirth);
            await this.monthOfBirthDropdown.selectByVisibleText(userData.monthOfBirth);
            await this.yearOfBirthDropdown.selectByVisibleText(userData.yearOfBirth);
        }

        if (userData.newsletterCheckbox === 'yes') {
            await this.newsletterCheckbox.click();
        }

        if (userData.specialOffersCheckbox === 'yes') {
            await this.specialOffersCheckbox.click();
        }

        await this.firstNameField.setValue(userData.firstName);
        await this.lastNameField.setValue(userData.lastName);

        if (userData.company) {
            await this.companyField.setValue(userData.company);
        }

        await this.addressField.setValue(userData.address);

        if (userData.address2) {
            await this.address2Field.setValue(userData.address2);
        }

        if (userData.country) {
            await this.countryDropdown.selectByVisibleText(userData.country);
        }

        await this.stateField.setValue(userData.state);
        await this.cityField.setValue(userData.city);
        await this.zipcodeField.setValue(userData.zipcode);
        await this.mobileNumberField.setValue(userData.mobileNumber);

        await this.createAccountButton.click();
        await this.continueButton.waitForDisplayed();
        await this.continueButton.click();
    }
}

export default new Signup();