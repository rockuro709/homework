@accountTests
Feature: User Account Management

  Scenario: Register user for testing
    Given I register a new user "fastUser"

  Scenario: User logs out and sees SignupOrLogin button
    When I log out
    Then I should see the SignupOrLogin button

  Scenario: Error when registering with an already registered email
    When I signup with user "fastUser"
    Then I should see the signup error message

  Scenario: Error when logging in with incorrect email or password
    When I login with user "fullUser"
    Then I should see the login error message

  Scenario: Register new user, verify login, delete account, verify logout and deleting
    Given I register a new user "fullUser"
    Then I should be logged in as "fullUser"
    When I delete the account
    Then I should see the SignupOrLogin button
    When I login with user "fullUser"
    Then I should see the login error message

  Scenario: Login as existed user, verify login, delete account, verify logout and deleting
    When I login with user "fastUser"
    Then I should be logged in as "fastUser"
    When I delete the account
    Then I should see the SignupOrLogin button
    When I login with user "fastUser"
    Then I should see the login error message
