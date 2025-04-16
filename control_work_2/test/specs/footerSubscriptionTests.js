import Header from "../pageobjects/components/header.js";
import TestData from "../testData.js";
import { expect } from "chai";

import Footer from "../pageobjects/components/footer.js";

describe("Footer Subscription Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });
  it("should make subscription to updates and show success alert", async () => {
    await Footer.subscribe(TestData.feedbackUser);
    expect(await Footer.subscribeSuccesAlert.isDisplayed()).to.be.true;
  });

  it("should scroll down page, click scroll up button and show element on top", async () => {
    await Footer.scrollUp();
    expect(await Footer.scrollUpButton.isDisplayed()).to.be.false;
  });
});
