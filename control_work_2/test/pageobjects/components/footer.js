import Base from "../base.js";

class Footer extends Base {
  get subscribeEmailField() {
    return $("#susbscribe_email");
  }
  get subscribeButton() {
    return $("#subscribe");
  }
  get subscribeSuccesAlert() {
    return $(".alert-success.alert");
  }
  get scrollUpButton() {
    return $("#scrollUp");
  }

  async subscribe(userData) {
    await this.subscribeEmailField.waitForDisplayed();
    await this.subscribeEmailField.setValue(userData.email);
    await this.subscribeButton.click();
    await this.subscribeSuccesAlert.waitForDisplayed();
  }

  async scrollUp() {
    await this.subscribeEmailField.scrollIntoView();
    await this.scrollUpButton.waitForDisplayed();
    await this.scrollUpButton.click();
    await this.waitForElementToDisappear(this.scrollUpButton); //кастомная ожидалка до пропажи элемента
  }
}

export default new Footer();
