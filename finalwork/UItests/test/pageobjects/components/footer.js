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
    await this.waitAndSetValue(this.subscribeEmailField, userData.email);
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

// метод при включённой рекламе
// async scrollUp() {
//   await this.subscribeEmailField.scrollIntoView();
//   const button = await this.scrollUpButton;
//   await button.waitForDisplayed();
//   await browser.execute((el) => el.click(), button);
//   await button.waitForDisplayed({ reverse: true });
// }
