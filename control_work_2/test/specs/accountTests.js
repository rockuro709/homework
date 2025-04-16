import Header from "../pageobjects/components/header.js";
import TestData from "../testData.js";
import Signup from "../pageobjects/signupPage.js";
import { expect } from "chai";
import SignupLogin from "../pageobjects/signupLoginPage.js";

describe("User Account Tests", () => {
  before(async () => {
    await Header.navigate("https://www.automationexercise.com/");
    await Signup.createNewAccount(TestData.fastUser);
    await Header.logout();
  });
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });

  it("registers a new user and verifies successful login and account deletion", async () => {
    await Signup.createNewAccount(TestData.fullUser);
    expect(await Header.loggedInAs.getText()).to.equal(
      `${TestData.fullUser.name}`
    );

    await Header.deleteAccount();
    expect(await Header.signupLoginButton.isDisplayed()).to.be.true;
    await SignupLogin.login(TestData.fullUser);
    expect(await SignupLogin.loginErrorMessage.isDisplayed()).to.be.true;
  });

  it("logs in with an existing user, verifies session, and deletes the account", async () => {
    await SignupLogin.login(TestData.fastUser);
    expect(await Header.loggedInAs.getText()).to.equal(
      `${TestData.fastUser.name}`
    );

    await Header.deleteAccount();
    expect(await Header.signupLoginButton.isDisplayed()).to.be.true;
    await SignupLogin.login(TestData.fastUser);
    expect(await SignupLogin.loginErrorMessage.isDisplayed()).to.be.true;
  });
});
