import Header from "../pageobjects/components/header.js";
import TestData from "../testData/testData.js";
import ContactUsPage from "../pageobjects/contactUsPage.js";

describe("Contact Us Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });

  it("opens the contact form, fills in user details, and submits feedback", async () => {
    await ContactUsPage.sendFeedback(TestData.feedbackUser);
    await expect(ContactUsPage.homeButton).toBeDisplayed();
  });
});
