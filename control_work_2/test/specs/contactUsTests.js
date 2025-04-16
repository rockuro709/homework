import Header from "../pageobjects/components/header.js";
import TestData from "../testData.js";
import { expect } from "chai";
import ContactUs from "../pageobjects/contactUsPage.js";

describe("Contact Us Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });
  it("should open feedback form, fill it and send", async () => {
    await ContactUs.sendFeedback(TestData.feedbackUser);
    expect(await ContactUs.homeButton.isDisplayed()).to.be.true;
  });
});
