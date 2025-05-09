import Base from "../base.js";
import ProductCard from "./productCard.js";

class CategoryBrands extends Base {
  getCategoryMapping() {
    return {
      women: $('[href="#Women"]'),
      men: $('[href="#Men"]'),
      kids: $('[href="#Kids"]'),
    };
  }

  getSubCategoryMapping() {
    return {
      "women-dress": $('[href="/category_products/1"]'),
      "women-tops": $('[href="/category_products/2"]'),
      "women-saree": $('[href="/category_products/7"]'),
      "men-tshirts": $('[href="/category_products/3"]'),
      "men-jeans": $('[href="/category_products/6"]'),
      "kids-dress": $('[href="/category_products/4"]'),
      "kids-tops&shirts": $('[href="/category_products/5"]'),
    };
  }

  getBrandMapping() {
    return {
      polo: $('[href="/brand_products/Polo"]'),
      "h&m": $('[href="/brand_products/H&M"]'),
      madame: $('[href="/brand_products/Madame"]'),
      "mast&harbour": $('[href="/brand_products/Mast & Harbour"]'),
      babyhug: $('[href="/brand_products/Babyhug"]'),
      "allen-solly-junior": $('[href="/brand_products/Allen Solly Junior"]'),
      "kookie-kids": $('[href="/brand_products/Kookie Kids"]'),
      biba: $('[href="/brand_products/Biba"]'),
    };
  }

  get textCenter() {
    return $(".title.text-center");
  }

  async getElementByName(name, mapping) {
    return mapping[name];
  }

  async chooseAndVerify(locator, expectedText) {
    await this.waitAndClick(locator);

    const text = await this.textCenter.getText();
    const textArray = expectedText
      .replace(/-/g, " ")
      .replace(/&/g, " ")
      .replace(/products/i, "")
      .split(" ");

    return textArray.every((word) =>
      text.toLowerCase().includes(word.toLowerCase())
    );
  }

  async chooseAndVerifyCategory(category) {
    const categoryElement = await this.getElementByName(
      category[0],
      this.getCategoryMapping()
    );
    const subCategoryElement = await this.getElementByName(
      category[1],
      this.getSubCategoryMapping()
    );

    await this.chooseAndVerify(categoryElement, category[0]);
    const isSubCategoryValid = await this.chooseAndVerify(
      subCategoryElement,
      category[1]
    );

    return isSubCategoryValid;
  }

  async chooseAndVerifyBrand(brand) {
    const brandElement = await this.getElementByName(
      brand,
      this.getBrandMapping()
    );
    return await this.chooseAndVerify(brandElement, brand);
  }

  async chooseBrandAndVerifyQuantityOfProducts(brand) {
    const brandElement = await this.getElementByName(
      brand,
      this.getBrandMapping()
    );

    const countSpan = await brandElement.$("span");
    const countText = await countSpan.getText();
    const count = parseInt(countText.replace(/\D/g, ""), 10);
    await this.waitAndClick(brandElement);
    const cardsQuantity = await ProductCard.ArrayOfProductCards;

    return count === cardsQuantity.length - 1;
  }
}

export default new CategoryBrands();
