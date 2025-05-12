import TestData from "../../testData/testData.js";
import CartPage from "../pageobjects/cartPage.js";
import PaymentPage from "../pageobjects/paymentPage.js";
import { Then } from "@wdio/cucumber-framework";

Then("I proceed to checkout and create new account", async () => {
  await CartPage.proceedToCheckoutWithSignUp(TestData.feedbackUser);
});

Then("I place, confirm and pay order", async () => {
  await PaymentPage.placeOrderPayAndConfirm(TestData.paymentCard);
});

Then("I should see invoice button as sign of successfull payment", async () => {
  await expect(PaymentPage.downloadInvoiceButton).toBeDisplayed();
});

Then("I proceed to checkout", async () => {
  await CartPage.proceedToCheckoutButton.click();
});

Then("I proceed to checkout and login with existed user", async () => {
  await CartPage.proceedToCheckoutWithLogin(TestData.feedbackUser);
});
