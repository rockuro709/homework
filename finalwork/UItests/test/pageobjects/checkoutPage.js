import Base from "./base.js";

class CheckoutPage extends Base {
  get placeOrderButton() {
    return $('[href="/payment"]');
  }
}

export default new CheckoutPage();
