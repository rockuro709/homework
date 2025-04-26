import Header from "../pageobjects/components/header.js";
import TestData from "../testData.js";
import SignupPage from "../pageobjects/signupPage.js";
import { expect } from "chai";
import SignupLoginPage from "../pageobjects/signupLoginPage.js";

describe("User Account Tests", () => {
  before(async () => {
    await Header.navigate("https://www.automationexercise.com/");
    await SignupPage.createNewAccount(TestData.fastUser);
    await Header.logout();
  });
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });

  it("registers a new user and verifies successful login and account deletion", async () => {
    await SignupPage.createNewAccount(TestData.fullUser);
    expect(await Header.loggedInAs.getText()).to.equal(
      `${TestData.fullUser.name}`
    );

    await Header.deleteAccount();
    expect(await Header.signupOrLoginButton.isDisplayed()).to.be.true;
    await SignupLoginPage.login(TestData.fullUser);
    expect(await SignupLoginPage.loginErrorMessage.isDisplayed()).to.be.true;
  });

  it("logs in with an existing user, verifies session, and deletes the account", async () => {
    await SignupLoginPage.login(TestData.fastUser);
    expect(await Header.loggedInAs.getText()).to.equal(
      `${TestData.fastUser.name}`
    );

    await Header.deleteAccount();
    expect(await Header.signupOrLoginButton.isDisplayed()).to.be.true;
    await SignupLoginPage.login(TestData.fastUser);
    expect(await SignupLoginPage.loginErrorMessage.isDisplayed()).to.be.true;
  });
});
