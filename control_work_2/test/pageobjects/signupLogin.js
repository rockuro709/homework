import Base from './base.js';
import Header from './components/header.js';

class SignupLogin extends Base {

    get loginEmailField() { return $('[data-qa="login-email"]'); }
    get loginPasswordField() { return $('[data-qa="login-password"]'); }
    get loginButton() { return $('[data-qa="login-button"]'); }

    get signupNameField() { return $('[data-qa="signup-name"]'); }
    get signupEmailField() { return $('[data-qa="signup-email"]'); }
    get signupButton() { return $('[data-qa="signup-button"]'); }

    get loginErrorMessage() { return $('//p[text()="Your email or password is incorrect!"]'); }

    async login(userData) {
        await Header.goToPageByHeaderButtonName('signupLogin');
        await this.loginEmailField.waitForDisplayed();
        await this.loginEmailField.setValue(userData.email);
        await this.loginPasswordField.setValue(userData.password);
        await this.loginButton.click();
    }

    async newUserSignup(userData) {
        await Header.goToPageByHeaderButtonName('signupLogin');
        await this.signupNameField.waitForDisplayed();
        await this.signupNameField.setValue(userData.name);
        await this.signupEmailField.setValue(userData.email);
        await this.signupButton.click();
    }
}

export default new SignupLogin();
