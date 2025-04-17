import Base from "../base.js";
import ProductPage from "../productPage.js";

class ProductCard extends Base {
  async getPrice(id) {
    return $(`//*[@src="/get_product_picture/${id}"]/following-sibling::h2`);
  }
  async getName(id) {
    return $(`//*[@src="/get_product_picture/${id}"]/following-sibling::p`);
  }
  async getAddToCartButton(id) {
    return $(`//*[@src="/get_product_picture/${id}"]/following-sibling::a`);
  }
  async getViewProductButton(id) {
    return await $(
      `//*[@src="/get_product_picture/${id}"]/following::i[contains(@class, "fa-plus-square")][1]`
    );
  }

  //в будущем разбить метод на получение данных и сравнение данных (пока не придумал зачем)
  async verifyProductData(id) {
    const normalizeText = (text) => text.replace(/\s+/g, " ");

    const productCardName = normalizeText(
      await (await this.getName(id)).getText()
    );
    const productCardPrice = await (await this.getPrice(id)).getText();

    await this.clickViewProductButton(id);

    const productName = normalizeText(await ProductPage.name.getText());
    const productPrice = await ProductPage.price.getText();

    return productName === productCardName && productPrice === productCardPrice;
  }

  async clickViewProductButton(id) {
    const viewProductButton = await this.getViewProductButton(id);
    await viewProductButton.waitForDisplayed();
    await viewProductButton.scrollIntoView();
    await viewProductButton.click();
  }
}
//добавить проверку брендов, кондишн и доступность
export default new ProductCard();
