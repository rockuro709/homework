import Base from "./base.js";
import ProductCard from "./components/productCard.js";
import ContinuePage from "./continuePage.js";

class CartPage extends Base {
  get cartTable() {
    return $("#cart_info_table");
  }

  get firstItem() {
    return $('(//*[@class="cart_description"]//h4/a)[1]');
  }

  async addToCart(id) {
    await this.waitAndClick(await ProductCard.getAddToCartButtonById(id));

    await this.waitAndClick(ContinuePage.viewCartButton);

    await this.cartTable.waitForDisplayed();
  }
}

export default new CartPage();
