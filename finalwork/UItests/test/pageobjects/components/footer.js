import Base from "../base.js";

class Footer extends Base {
  get subscribeEmailField() {
    return $("#susbscribe_email");
  }
  get subscribeButton() {
    return $("#subscribe");
  }
  get subscribeSuccessAlert() {
    return $(".alert-success.alert");
  }
  get scrollUpButton() {
    return $("#scrollUp");
  }

  async subscribe(userKey) {
    await this.waitAndSetValue(this.subscribeEmailField, userKey.email);
    await this.subscribeButton.click();
    await this.subscribeSuccessAlert.waitForDisplayed();
  }

  async scrollUp() {
    await this.subscribeEmailField.scrollIntoView();
    await this.waitAndClick(this.scrollUpButton);
    await this.scrollUpButton.waitForDisplayed({ reverse: true });
  }
}

export default new Footer();
