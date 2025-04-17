import Base from "../base.js";

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

  async chooseAndVerify(element, expectedText) {
    await element.waitForDisplayed();
    await element.scrollIntoView();
    await element.click();

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
}

export default new CategoryBrands();
