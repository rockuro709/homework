import Base from "./base.js";

class ContinuePage extends Base {
  get continueButton() {
    return $('[data-qa="continue-button"]');
  }
  get continueShoppingButton() {
    return $(".btn.btn-success.close-modal.btn-block");
  }
  get viewCartButton() {
    return $('.text-center [href="/view_cart"]');
  }

  async clickContinueButton() {
    await this.continueButton.waitForDisplayed();
    await this.continueButton.click();
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.waitForDisplayed();
    await this.continueShoppingButton.click();
  }

  async clickViewCartButton() {
    await this.viewCartButton.waitForDisplayed();
    await this.viewCartButton.click();
  }
}

export default new ContinuePage();
