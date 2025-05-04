import Header from "../pageobjects/components/header.js";
import TestData from "../testData/testData.js";
import { expect } from "chai";
import CategoryBrands from "../pageobjects/components/categoryBrands.js";

describe.skip("Category and Brand Selection Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });
  it("selects a category and verifies the filtered product results", async () => {
    expect(await CategoryBrands.chooseAndVerifyCategory(TestData.category)).to
      .be.true;
  });

  it("selects a brand and verifies the filtered product results", async () => {
    expect(await CategoryBrands.chooseAndVerifyBrand(TestData.brand)).to.be
      .true;
  });
});
