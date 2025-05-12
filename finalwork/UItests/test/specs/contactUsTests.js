import TestData from "../../testData/testData.js";
import ContactUsPage from "../pageobjects/contactUsPage.js";

describe("Contact Us Tests", () => {
  it("opens the contact form, fills in user details, and submits feedback", async () => {
    await ContactUsPage.sendFeedback(TestData.feedbackUser);
    await expect(ContactUsPage.homeButton).toBeDisplayed();
  });
});
