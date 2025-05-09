import TestData from "../testData/testData.js";
import ProductCard from "../pageobjects/components/productCard.js";
import ProductPage from "../pageobjects/productPage.js";

describe("Product Tests", () => {
  TestData.idProduct.forEach((id) => {
    it(`validates name and price consistency for product ID: ${id}`, async () => {
      await expect(await ProductCard.verifyProductData(id)).toBeTruthy();
    });
  });

  it("submits a product review and verifies submission confirmation", async () => {
    await ProductPage.submitReview(
      TestData.idProduct[0],
      TestData.feedbackUser
    );
    await expect(ProductPage.reviewSuccessfulAlert).toBeDisplayed();
  });
});
