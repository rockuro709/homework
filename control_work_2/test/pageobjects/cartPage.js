import Base from "./base.js";
import ProductCard from "./components/productCard.js";
import ContinuePage from "./continuePage.js";

class Cart extends Base {
  get cartTable() {
    return $("#cart_info_table");
  }
  get firstItem() {
    return $('(//*[@class="cart_description"]//h4/a)[1]');
  }

  async addToCart(id) {
    const addToCartButton = await ProductCard.getAddToCartButton(id);
    await addToCartButton.waitForDisplayed();
    await addToCartButton.scrollIntoView();
    await addToCartButton.click();

    await ContinuePage.clickViewCartButton();

    await this.cartTable.waitForDisplayed();
  }
}

export default new Cart();

//    get allItemsNames() { return $$('.cart_description h4 a'); }
//    const allItems = await this.allItemsNames;
