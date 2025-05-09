import { When, Then } from "@wdio/cucumber-framework";
import ContactUsPage from "../pageobjects/contactUsPage.js";
import TestData from "../testData/testData.js";

When("I open the contact form and submit it with valid data", async () => {
  await ContactUsPage.sendFeedback(TestData.feedbackUser);
});

Then("I should see the home button as a sign of success", async () => {
  await expect(ContactUsPage.homeButton).toBeDisplayed();
});
