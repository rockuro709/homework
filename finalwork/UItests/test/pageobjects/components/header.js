import Base from "../base.js";
import ContinuePage from "../continuePage.js";

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
  get signupOrLoginButton() {
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
    await this.waitAndClick(ContinuePage.continueButton);
    await this.signupOrLoginButton.waitForDisplayed();
  }

  async logout() {
    await this.waitAndClick(this.logoutButton);
    await this.signupOrLoginButton.waitForDisplayed();
  }
}

export default new Header();
