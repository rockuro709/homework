import { Given, When, Then } from "@wdio/cucumber-framework";
import Header from "../pageobjects/components/header.js";
import SignupPage from "../pageobjects/signupPage.js";
import SignupLoginPage from "../pageobjects/signupLoginPage.js";
import TestData from "../../testData/testData.js";

// Scenario: Register user for testing = Before
Given("I register a new user {string}", async (userKey) => {
  await SignupPage.createNewAccount(TestData[userKey]);
});

Given("I log out", async () => {
  await Header.logout();
});

Then("I should see the SignupOrLogin button", async () => {
  await expect(Header.signupOrLoginButton).toBeDisplayed();
});

When("I signup with user {string}", async (userKey) => {
  await SignupLoginPage.newUserSignup(TestData[userKey]);
});

Then("I should see the signup error message", async () => {
  await expect(SignupLoginPage.signupErrorMessage).toBeDisplayed();
});

When("I login with user {string}", async (userKey) => {
  await SignupLoginPage.login(TestData[userKey]);
});

Then("I should see the login error message", async () => {
  await expect(SignupLoginPage.loginErrorMessage).toBeDisplayed();
});

Then("I should be logged in as {string}", async (userKey) => {
  await expect(Header.loggedInAs).toHaveText(TestData[userKey].name);
});

Given("I delete the account", async () => {
  await Header.deleteAccount();
});
