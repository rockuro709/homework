import Base from "./base.js";
import CheckoutPage from "./checkoutPage.js";

class PaymentPage extends Base {
  get paymentCardNameField() {
    return $('[data-qa="name-on-card"]');
  }
  get paymentCardNumberField() {
    return $('[data-qa="card-number"]');
  }
  get paymentCardCVCField() {
    return $('[data-qa="cvc"]');
  }
  get paymentCardExpiryMonthField() {
    return $('[data-qa="expiry-month"]');
  }
  get paymentCardExpiryYearField() {
    return $('[data-qa="expiry-year"]');
  }
  get payAndConfirmOrderButton() {
    return $('[data-qa="pay-button"]');
  }
  get paymentSuccessAlert() {
    return $('[id="success_message"]');
  }
  get downloadInvoiceButton() {
    return $(".btn.btn-default.check_out");
  }

  async placeOrderPayAndConfirm(paymentCard) {
    await this.waitAndClick(CheckoutPage.placeOrderButton);
    await this.waitAndSetValue(this.paymentCardNameField, paymentCard.name);
    await this.paymentCardNumberField.setValue(paymentCard.number);
    await this.paymentCardCVCField.setValue(paymentCard.CVC);
    await this.paymentCardExpiryMonthField.setValue(paymentCard.expiryMonth);
    await this.paymentCardExpiryYearField.setValue(paymentCard.expiryYear);
    await this.payAndConfirmOrderButton.click();
    // await browser.pause(2000);
    await this.downloadInvoiceButton.waitForDisplayed();
  }
}

export default new PaymentPage();
