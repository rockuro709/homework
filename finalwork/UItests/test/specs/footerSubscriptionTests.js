import Header from "../pageobjects/components/header.js";
import TestData from "../testData/testData.js";
import { expect } from "chai";
import Footer from "../pageobjects/components/footer.js";

describe("Footer Subscription Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
    //await browser.refresh();
  });
  it("subscribes a user to updates and verifies success alert is shown", async () => {
    await Footer.subscribe(TestData.feedbackUser);
    expect(await Footer.subscribeSuccessAlert.isDisplayed()).to.be.true;
  });

  it("scrolls down and back up the page, verifying scroll-up button behavior", async () => {
    await Footer.scrollUp();
    expect(await Footer.scrollUpButton.isDisplayed()).to.be.false;
  });
});
