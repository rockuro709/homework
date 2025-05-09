import Base from "./base.js";
import Header from "./components/header.js";

class SignupLoginPage extends Base {
  get loginEmailField() {
    return $('[data-qa="login-email"]');
  }
  get loginPasswordField() {
    return $('[data-qa="login-password"]');
  }
  get loginButton() {
    return $('[data-qa="login-button"]');
  }

  get signupNameField() {
    return $('[data-qa="signup-name"]');
  }
  get signupEmailField() {
    return $('[data-qa="signup-email"]');
  }
  get signupButton() {
    return $('[data-qa="signup-button"]');
  }

  get loginErrorMessage() {
    return $(".login-form p");
  }

  get signupErrorMessage() {
    return $(".signup-form p");
  }

  async login(userKey) {
    await this.waitAndClick(Header.signupOrLoginButton);
    await this.waitAndSetValue(this.loginEmailField, userKey.email);
    await this.loginPasswordField.setValue(userKey.password);
    await this.loginButton.click();
  }

  async newUserSignup(userKey) {
    await this.waitAndClick(Header.signupOrLoginButton);
    await this.waitAndSetValue(this.signupNameField, userKey.name);
    await this.signupEmailField.setValue(userKey.email);
    await this.signupButton.click();
  }
}

export default new SignupLoginPage();
