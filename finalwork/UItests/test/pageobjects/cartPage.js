import Base from "./base.js";
import ProductCard from "./components/productCard.js";
import ContinuePage from "./continuePage.js";
import SignupPage from "./signupPage.js";
import Header from "./components/header.js";
import SignupLoginPage from "./signupLoginPage.js";

class CartPage extends Base {
  get cartTable() {
    return $("#cart_info_table");
  }

  get namesOfItemsInCart() {
    return $$('//*[@class="cart_description"]//h4/a');
  }

  get quantityOfItemsInCart() {
    return $$(".cart_quantity button");
  }

  get deleteButtonsOfItemsInCart() {
    return $$(".fa.fa-times");
  }

  get emptyCartAlert() {
    return $(".text-center b");
  }

  get proceedToCheckoutButton() {
    return $(".btn.btn-default.check_out");
  }

  async addToCartAndContinueShopping(id) {
    await this.waitAndClick(await ProductCard.getAddToCartButtonById(id));
    await this.waitAndClick(ContinuePage.continueShoppingButton);
  }

  async addToCartAndViewCart(id) {
    await this.waitAndClick(await ProductCard.getAddToCartButtonById(id));
    await this.waitAndClick(ContinuePage.viewCartButton);
    await this.cartTable.waitForDisplayed();
  }

  async addToCartFewTimesAndViewCart(id, quantity) {
    for (let i = 1; i < quantity; i++) {
      await this.addToCartAndContinueShopping(id);
    }
    await this.addToCartAndViewCart(id);
  }

  async proceedToCheckoutWithSignUp(userKey) {
    await this.proceedToCheckoutButton.click();
    await this.waitAndClick(ContinuePage.checkoutRegisterLoginButton);
    await SignupPage.createNewAccount(userKey);
    await this.waitAndClick(Header.cartButton);
    await this.waitAndClick(this.proceedToCheckoutButton);
  }

  async proceedToCheckoutWithLogin(userKey) {
    await this.proceedToCheckoutButton.click();
    await this.waitAndClick(ContinuePage.checkoutRegisterLoginButton);
    await SignupLoginPage.login(userKey);
    await this.waitAndClick(Header.cartButton);
    await this.waitAndClick(this.proceedToCheckoutButton);
  }
}

export default new CartPage();
