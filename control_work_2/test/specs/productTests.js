import Header from "../pageobjects/components/header.js";
import TestData from "../testData.js";
import { expect } from "chai";

import ProductCard from "../pageobjects/components/productCard.js";
import Product from "../pageobjects/productPage.js";

describe("Product Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });
  TestData.idProduct.forEach((id) => {
    it("should match product name and price between product card and product page", async () => {
      expect(await ProductCard.verifyProductData(id)).to.be.true;
    });
  });

  it("should submit review on product page", async () => {
    expect(
      await Product.submitReview(TestData.idProduct[0], TestData.feedbackUser)
    ).to.be.true;
  });
});
