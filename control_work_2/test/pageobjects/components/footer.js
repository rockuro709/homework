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

  async subscribe(userData) {
    await this.subscribeEmailField.waitForDisplayed();
    await this.subscribeEmailField.setValue(userData.email);
    await this.subscribeButton.click();
    await this.subscribeSuccessAlert.waitForDisplayed();
  }

  async scrollUp() {
    await this.subscribeEmailField.scrollIntoView();
    const button = await this.scrollUpButton;
    await button.waitForDisplayed();
    //кнопка 50/50 закрыта рекламой в шэдоуруте, шэдоурут одолеть не получилось
    await browser.execute((el) => el.click(), button);
    await button.waitForDisplayed({ reverse: true });
  }
}

export default new Footer();
