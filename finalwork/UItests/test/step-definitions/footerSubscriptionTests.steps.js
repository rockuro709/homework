import { When, Then } from "@wdio/cucumber-framework";
import Footer from "../pageobjects/components/footer.js";
import TestData from "../../testData/testData.js";

When("I subscribe to updates with valid data", async () => {
  await Footer.subscribe(TestData.feedbackUser);
});

Then("I should see a success alert", async () => {
  await expect(Footer.subscribeSuccessAlert).toBeDisplayed();
});

When("I scroll to the bottom and click the scroll-up button", async () => {
  await Footer.scrollUp();
});

Then(
  "I should be back at the top and the scroll-up button should disappear",
  async () => {
    await expect(Footer.scrollUpButton).not.toBeDisplayed();
  }
);
