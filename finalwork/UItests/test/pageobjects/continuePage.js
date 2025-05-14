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
  get continueOnCartButton() {
    return $(".btn.btn-success");
  }
  get checkoutRegisterLoginButton() {
    return $('.text-center [href="/login"]');
  }
}

export default new ContinuePage();
