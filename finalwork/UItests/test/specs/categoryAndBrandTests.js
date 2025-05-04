import Header from "../pageobjects/components/header.js";
import TestData from "../testData/testData.js";
import CategoryBrands from "../pageobjects/components/categoryBrands.js";

describe("Category and Brand Selection Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });

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
});
