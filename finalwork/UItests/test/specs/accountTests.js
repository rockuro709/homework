import Header from "../pageobjects/components/header.js";
import TestData from "../testData/testData.js";
import SignupPage from "../pageobjects/signupPage.js";
import { expect } from "chai";
import SignupLoginPage from "../pageobjects/signupLoginPage.js";
import signupLoginPage from "../pageobjects/signupLoginPage.js";

describe("User Account Tests", () => {
  before(async () => {
    await Header.navigate("https://www.automationexercise.com/");
    await SignupPage.createNewAccount(TestData.fastUser);
  });

  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });

  it("logs out from the account and verifies logout was successful", async () => {
    await Header.logout();
    expect(await Header.signupOrLoginButton.isDisplayed()).to.be.true;
  });

  it("displays an error when registering with an already registered email", async () => {
    await SignupLoginPage.newUserSignup(TestData.fastUser);
    expect(await SignupLoginPage.signupErrorMessage.isDisplayed()).to.be.true;
  });

  it("displays an error when loging with an incorrect email or password", async () => {
    await signupLoginPage.login(TestData.fullUser);
    expect(await SignupLoginPage.loginErrorMessage.isDisplayed()).to.be.true;
  })

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
