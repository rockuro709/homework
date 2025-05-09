import TestData from "../testData/testData.js";
import CartPage from "../pageobjects/cartPage.js";
import PaymentPage from "../pageobjects/paymentPage.js";
import Header from "../pageobjects/components/header.js";

describe("Checkout and Payment Tests", () => {
  it("completes purchase with new user registration while checkout", async () => {
    await CartPage.addToCartAndViewCart(TestData.idProduct[0]);
    await CartPage.proceedToCheckoutWithSignUp(TestData.feedbackUser);
    await PaymentPage.placeOrderPayAndConfirm(TestData.paymentCard);
    await expect(PaymentPage.downloadInvoiceButton).toBeDisplayed();
  });

  it("completes purchase with login before checkout", async () => {
    await CartPage.addToCartAndViewCart(TestData.idProduct[0]);
    await CartPage.proceedToCheckoutButton.click();
    await PaymentPage.placeOrderPayAndConfirm(TestData.paymentCard);
    await expect(PaymentPage.downloadInvoiceButton).toBeDisplayed();
    await Header.logout();
  });

  it("completes purchase with login while checkout", async () => {
    await CartPage.addToCartAndViewCart(TestData.idProduct[0]);
    await CartPage.proceedToCheckoutWithLogin(TestData.feedbackUser);
    await PaymentPage.placeOrderPayAndConfirm(TestData.paymentCard);
    await expect(PaymentPage.downloadInvoiceButton).toBeDisplayed();
    await Header.deleteAccount();
  });
});
