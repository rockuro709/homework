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
}

export default new ContinuePage();
