import Header from "../pageobjects/components/header.js";
import TestData from "../testData.js";
import { expect } from "chai";

import CategoryBrands from "../pageobjects/components/categoryBrands.js";

describe("Category and Brand Selection Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });
  it("should choose correct category", async () => {
    expect(await CategoryBrands.chooseAndVerifyCategory(TestData.category)).to
      .be.true;
  });

  it("should choose correct brand", async () => {
    expect(await CategoryBrands.chooseAndVerifyBrand(TestData.brand)).to.be
      .true;
  });
});
