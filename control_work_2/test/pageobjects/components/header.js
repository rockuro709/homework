import Base from '../base.js';

class Header extends Base {

    get logoutButton() { return $('[href="/logout"] .fa.fa-lock'); }
    get deleteAccountButton() { return $('[href="/delete_account"] .fa.fa-trash-o'); }
    get loggedInAs() { return $('//i[@class="fa fa-user"]/following-sibling::b'); }
    get continueButton() { return $('[data-qa="continue-button"]'); }
    //continueButton повторяется в Header и Signup, но она используется только в двух случаях, поэтому нет смысла делать отдельный файл

    get logo() { return $('.logo.pull-left'); }
    get home() { return $('.fa.fa-home'); }
    get products() { return $('.material-icons.card_travel'); }
    get cart() { return $('[href="/view_cart"] .fa.fa-shopping-cart'); }
    get signupLogin() { return $('[href="/login"] .fa.fa-lock'); }
    get testCases() { return $('[href="/test_cases"] .fa.fa-list'); }
    get apiTesting() { return $('[href="/api_list"] .fa.fa-list'); }
    get videoTutorials() { return $('.fa.fa-youtube-play'); }
    get contactUs() { return $('.fa.fa-envelope'); }
    
    async getHeaderButtonByName(headerButtonName) {
        const button = this[headerButtonName];
        await button.waitForDisplayed();
        return button;
    }

    async goToPageByHeaderButtonName(headerButtonName) {
        const button = await this.getHeaderButtonByName(headerButtonName);
        await button.click();
    }

    async deleteAccount() {
        await this.deleteAccountButton.click();
        await this.continueButton.waitForDisplayed();
        await this.continueButton.click();
        await this.signupLogin.waitForDisplayed();
    }

    async logout() {
        await this.logoutButton.waitForDisplayed();
        await this.logoutButton.click();
        await this.signupLogin.waitForDisplayed();
    }
}

export default new Header();
