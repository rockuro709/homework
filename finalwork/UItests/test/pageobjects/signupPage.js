import Base from "./base.js";
import SignupLoginPage from "./signupLoginPage.js";
import ContinuePage from "./continuePage.js";

class SignupPage extends Base {
  get titleMrRadioButton() {
    return $("#uniform-id_gender1");
  }
  get titleMrsRadioButton() {
    return $("#uniform-id_gender2");
  }
  get nameField() {
    return $('[data-qa="name"]');
  }
  get emailField() {
    return $('[data-qa="email"]');
  }
  get passwordField() {
    return $('[data-qa="password"]');
  }
  get dayOfBirthDropdown() {
    return $('[data-qa="days"]');
  }
  get monthOfBirthDropdown() {
    return $('[data-qa="months"]');
  }
  get yearOfBirthDropdown() {
    return $('[data-qa="years"]');
  }
  get newsletterCheckbox() {
    return $("#newsletter");
  }
  get specialOffersCheckbox() {
    return $("#optin");
  }
  get firstNameField() {
    return $('[data-qa="first_name"]');
  }
  get lastNameField() {
    return $('[data-qa="last_name"]');
  }
  get companyField() {
    return $('[data-qa="company"]');
  }
  get address1Field() {
    return $('[data-qa="address"]');
  }
  get address2Field() {
    return $('[data-qa="address2"]');
  }
  get countryDropdown() {
    return $('[data-qa="country"]');
  }
  get stateField() {
    return $('[data-qa="state"]');
  }
  get cityField() {
    return $('[data-qa="city"]');
  }
  get zipcodeField() {
    return $('[data-qa="zipcode"]');
  }
  get mobileNumberField() {
    return $('[data-qa="mobile_number"]');
  }

  get createAccountButton() {
    return $('[data-qa="create-account"]');
  }

  async createNewAccount(userKey) {
    await SignupLoginPage.newUserSignup(userKey);
    await this.titleMrRadioButton.waitForDisplayed();

    if (userKey.title === "Mr") {
      await this.titleMrRadioButton.click();
    } else if (userKey.title === "Mrs") {
      await this.titleMrsRadioButton.click();
    }

    await this.passwordField.setValue(userKey.password);

    if (userKey.dayOfBirth && userKey.monthOfBirth && userKey.yearOfBirth) {
      await this.dayOfBirthDropdown.selectByVisibleText(userKey.dayOfBirth);
      await this.monthOfBirthDropdown.selectByVisibleText(userKey.monthOfBirth);
      await this.yearOfBirthDropdown.selectByVisibleText(userKey.yearOfBirth);
    }

    if (userKey.newsletterCheckbox === "yes") {
      await this.newsletterCheckbox.click();
    }

    if (userKey.specialOffersCheckbox === "yes") {
      await this.specialOffersCheckbox.click();
    }

    await this.firstNameField.setValue(userKey.firstName);
    await this.lastNameField.setValue(userKey.lastName);

    if (userKey.company) {
      await this.companyField.setValue(userKey.company);
    }

    await this.address1Field.setValue(userKey.address1);

    if (userKey.address2) {
      await this.address2Field.setValue(userKey.address2);
    }

    if (userKey.country) {
      await this.countryDropdown.selectByVisibleText(userKey.country);
    }

    await this.stateField.setValue(userKey.state);
    await this.cityField.setValue(userKey.city);
    await this.zipcodeField.setValue(userKey.zipcode);
    await this.mobileNumberField.setValue(userKey.mobileNumber);

    await this.createAccountButton.click();
    await this.waitAndClick(ContinuePage.continueButton);
  }
}

export default new SignupPage();
