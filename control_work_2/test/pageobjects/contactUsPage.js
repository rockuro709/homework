import Base from "./base.js";
import Header from "./components/header.js";
import path from "path";

class ContactUsPage extends Base {
  get nameField() {
    return $('[data-qa="name"]');
  }
  get emailField() {
    return $('[data-qa="email"]');
  }
  get subjectField() {
    return $('[data-qa="subject"]');
  }
  get messageField() {
    return $('[data-qa="message"]');
  }

  get uploadFileButton() {
    return $('[name="upload_file"]');
  }
  get submitButton() {
    return $('[data-qa="submit-button"]');
  }
  get homeButton() {
    return $(".btn.btn-success");
  }

  async sendFeedback(userData) {
    await Header.contactUsButton.waitForDisplayed();
    await Header.contactUsButton.click();
    await this.nameField.waitForDisplayed();
    await this.nameField.setValue(userData.name);
    await this.emailField.setValue(userData.email);
    await this.subjectField.setValue(userData.subject);
    await this.messageField.setValue(userData.message);
    const testFilePath = path.resolve("test/testImage.png");
    await this.uploadFileButton.setValue(testFilePath);
    browser.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await this.submitButton.click();
    await this.homeButton.waitForDisplayed();
  }
}

export default new ContactUsPage();
