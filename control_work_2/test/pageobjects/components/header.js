import Base from "../base.js";
import Continue from "../continuePage.js";

class Header extends Base {
  get logoButton() {
    return $(".logo.pull-left");
  }
  get homeButton() {
    return $(".fa.fa-home");
  }
  get productsButton() {
    return $(".material-icons.card_travel");
  }
  get cartButton() {
    return $('[href="/view_cart"] .fa.fa-shopping-cart');
  }
  get signupLoginButton() {
    return $('[href="/login"] .fa.fa-lock');
  }
  get logoutButton() {
    return $('[href="/logout"] .fa.fa-lock');
  }
  get deleteAccountButton() {
    return $('[href="/delete_account"] .fa.fa-trash-o');
  }
  get testCasesButton() {
    return $('[href="/test_cases"] .fa.fa-list');
  }
  get apiTestingButton() {
    return $('[href="/api_list"] .fa.fa-list');
  }
  get videoTutorialsButton() {
    return $(".fa.fa-youtube-play");
  }
  get contactUsButton() {
    return $(".fa.fa-envelope");
  }
  get loggedInAs() {
    return $('//i[@class="fa fa-user"]/following-sibling::b');
  }

  async deleteAccount() {
    await this.deleteAccountButton.click();
    await Continue.clickContinueButton();
    await this.signupLoginButton.waitForDisplayed();
  }

  async logout() {
    await this.logoutButton.waitForDisplayed();
    await this.logoutButton.click();
    await this.signupLoginButton.waitForDisplayed();
  }
}

export default new Header();
