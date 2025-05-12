import TestData from "../../testData/testData.js";
import CategoryBrands from "../pageobjects/components/categoryBrands.js";

describe("Category and Brand Selection Tests", () => {
  it("selects a category and verifies the filtered product results", async () => {
    await expect(
      await CategoryBrands.chooseAndVerifyCategory(TestData.category)
    ).toBeTruthy();
  });

  it("selects a brand and verifies the filtered product results", async () => {
    await expect(
      await CategoryBrands.chooseAndVerifyBrand(TestData.brand)
    ).toBeTruthy();
  });

  it("selects a brand and verifies that the number of its products matches the displayed product cards", async () => {
    await expect(
      await CategoryBrands.chooseBrandAndVerifyQuantityOfProducts(
        TestData.brand
      )
    ).toBeTruthy();
  });
});
