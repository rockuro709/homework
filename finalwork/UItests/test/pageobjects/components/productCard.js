import Base from "../base.js";
import ProductPage from "../productPage.js";

class ProductCard extends Base {
  async getPriceById(id) {
    return $(`//*[@src="/get_product_picture/${id}"]/following-sibling::h2`);
  }
  async getNameById(id) {
    return $(`//*[@src="/get_product_picture/${id}"]/following-sibling::p`);
  }
  async getAddToCartButtonById(id) {
    return $(`//*[@src="/get_product_picture/${id}"]/following-sibling::a`);
  }
  async getViewProductButtonById(id) {
    return await $(
      `//*[@src="/get_product_picture/${id}"]/following::i[contains(@class, "fa-plus-square")][1]`
    );
  }

  get ArrayOfProductCards() {
    return $$(".col-sm-4");
  }

  async verifyProductData(id) {
    const normalizeText = (text) => text.replace(/\s+/g, " ");

    const productCardName = normalizeText(
      await (await this.getNameById(id)).getText()
    );
    const productCardPrice = await (await this.getPriceById(id)).getText();

    await this.waitAndClick(await this.getViewProductButtonById(id));

    const productName = normalizeText(await ProductPage.name.getText());
    const productPrice = await ProductPage.price.getText();

    return productName === productCardName && productPrice === productCardPrice;
  }
}
export default new ProductCard();
