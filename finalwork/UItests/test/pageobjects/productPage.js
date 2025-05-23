import Base from "./base.js";
import ProductCard from "./components/productCard.js";
import ContinuePage from "./continuePage.js";
import CartPage from "./cartPage.js";

class ProductPage extends Base {
  get name() {
    return $(".product-information h2");
  }
  get category() {
    return $(".product-information p");
  }
  get price() {
    return $(".product-information span span");
  }
  get quantityInput() {
    return $("#quantity");
  }
  get addToCartButton() {
    return $(".btn.btn-default.cart");
  }
  get availability() {
    return $(".product-information p b");
  }
  get condition() {
    return $(".product-information p:nth-of-type(3) b");
  }
  get brand() {
    return $(".product-information p:nth-of-type(4) b");
  }
  get reviewNameField() {
    return $("#name");
  }
  get reviewEmailField() {
    return $("#email");
  }
  get reviewField() {
    return $('//*[@id="review"]');
  }
  get reviewSubmitButton() {
    return $("#button-review");
  }
  get reviewSuccessfulAlert() {
    return $(".form-row span");
  }

  async submitReview(id, userKey) {
    await this.waitAndClick(await ProductCard.getViewProductButtonById(id));
    await this.waitAndSetValue(this.reviewNameField, userKey.name);
    await this.reviewEmailField.setValue(userKey.email);
    await this.reviewField.setValue(userKey.message);
    await this.reviewSubmitButton.click();
    await this.reviewSuccessfulAlert.waitForDisplayed();
  }

  async addToCartWithQuantityAndViewCart(id, quantity) {
    await this.waitAndClick(await ProductCard.getViewProductButtonById(id));
    await this.waitAndSetValue(this.quantityInput, quantity);
    await this.addToCartButton.click();
    await this.waitAndClick(ContinuePage.viewCartButton);
    await CartPage.cartTable.waitForDisplayed();
  }
}

export default new ProductPage();
