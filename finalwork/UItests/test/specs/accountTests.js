import { expect } from "@wdio/globals";
import Header from "../pageobjects/components/header.js";
import TestData from "../testData/testData.js";
import SignupPage from "../pageobjects/signupPage.js";
import SignupLoginPage from "../pageobjects/signupLoginPage.js";

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
    await expect(Header.signupOrLoginButton).toBeDisplayed();
  });

  it("displays an error when registering with an already registered email", async () => {
    await SignupLoginPage.newUserSignup(TestData.fastUser);
    await expect(SignupLoginPage.signupErrorMessage).toBeDisplayed();
  });

  it("displays an error when logging in with an incorrect email or password", async () => {
    await SignupLoginPage.login(TestData.fullUser);
    await expect(SignupLoginPage.loginErrorMessage).toBeDisplayed();
  });

  it("registers a new user and verifies successful login and account deletion", async () => {
    await SignupPage.createNewAccount(TestData.fullUser);
    await expect(Header.loggedInAs).toHaveText(`${TestData.fullUser.name}`);

    await Header.deleteAccount();
    await expect(Header.signupOrLoginButton).toBeDisplayed();

    await SignupLoginPage.login(TestData.fullUser);
    await expect(SignupLoginPage.loginErrorMessage).toBeDisplayed();
  });

  it("logs in with an existing user, verifies session, and deletes the account", async () => {
    await SignupLoginPage.login(TestData.fastUser);
    await expect(Header.loggedInAs).toHaveText(`${TestData.fastUser.name}`);

    await Header.deleteAccount();
    await expect(Header.signupOrLoginButton).toBeDisplayed();

    await SignupLoginPage.login(TestData.fastUser);
    await expect(SignupLoginPage.loginErrorMessage).toBeDisplayed();
  });
});
