import Header from "../pageobjects/components/header.js";
import TestData from "../testData/testData.js";
import { expect } from "chai";
import ProductCard from "../pageobjects/components/productCard.js";
import ProductPage from "../pageobjects/productPage.js";

describe.skip("Product Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });
  TestData.idProduct.forEach((id) => {
    it(`validates name and price consistency for product ID: ${id}`, async () => {
      expect(await ProductCard.verifyProductData(id)).to.be.true;
    });
  });

  it("submits a product review and verifies submission confirmation", async () => {
    expect(
      await ProductPage.submitReview(
        TestData.idProduct[0],
        TestData.feedbackUser
      )
    );
    expect(await ProductPage.reviewSuccessfulAlert.isDisplayed()).to.be.true;
  });
});
