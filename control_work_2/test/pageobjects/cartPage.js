import Base from "./base.js";
import ProductCard from "./components/productCard.js";
import ContinuePage from "./continuePage.js";

class CartPage extends Base {
  get cartTable() {
    return $("#cart_info_table");
  }

  //переделать в универсальный геттер (пока не знаю как: динамический локатор или брать массив локаторов через $$)
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

export default new CartPage();

//    get allItemsNames() { return $$('.cart_description h4 a'); }
//    const allItems = await this.allItemsNames;
