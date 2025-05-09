import TestData from "../testData/testData.js";
import Footer from "../pageobjects/components/footer.js";

describe("Footer Subscription Tests", () => {
  it("subscribes a user to updates and verifies success alert is shown", async () => {
    await Footer.subscribe(TestData.feedbackUser);
    await expect(Footer.subscribeSuccessAlert).toBeDisplayed();
  });

  it("scrolls down and back up the page, verifying scroll-up button behavior", async () => {
    await Footer.scrollUp();
    await expect(Footer.scrollUpButton).not.toBeDisplayed();
  });
});
