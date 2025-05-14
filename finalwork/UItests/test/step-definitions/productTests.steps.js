import { When, Then } from "@wdio/cucumber-framework";
import TestData from "../../testData/testData.js";
import ProductCard from "../pageobjects/components/productCard.js";
import ProductPage from "../pageobjects/productPage.js";

When(
  "I open the product page with ID {int} from home page",
  async function (testDataIdProductIndex) {
    this.verifyResult = await ProductCard.verifyProductData(
      TestData.idProduct[testDataIdProductIndex]
    );
  }
);

Then("the name and the price should match the product card", async function () {
  expect(this.verifyResult).toBeTruthy();
});

When("I submit a review for the product", async () => {
  await ProductPage.submitReview(TestData.idProduct[0], TestData.feedbackUser);
});

Then("I should see an alert of successful review submission", async () => {
  await expect(ProductPage.reviewSuccessfulAlert).toBeDisplayed();
});
