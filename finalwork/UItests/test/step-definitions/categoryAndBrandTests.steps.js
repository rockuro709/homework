import { When, Then } from "@wdio/cucumber-framework";
import CategoryBrands from "../pageobjects/components/categoryBrands.js";
import TestData from "../testData/testData.js";

When("I select a category", async function () {
  this.resultCategory = await CategoryBrands.chooseAndVerifyCategory(
    TestData.category
  );
});

Then("I should see only products from that category", async function () {
  await expect(this.resultCategory).toBeTruthy();
});

When("I select a brand", async function () {
  this.resultBrand = await CategoryBrands.chooseAndVerifyBrand(TestData.brand);
});

Then("I should see only products from that brand", async function () {
  await expect(this.resultBrand).toBeTruthy();
});

When("I select a brand with a certain number of products", async function () {
  this.resultQuantity =
    await CategoryBrands.chooseBrandAndVerifyQuantityOfProducts(TestData.brand);
});

Then("this number should match the displayed product cards", async function () {
  await expect(this.resultQuantity).toBeTruthy();
});
