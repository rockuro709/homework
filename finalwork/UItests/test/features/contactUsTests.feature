@contactUsTests
Feature: Contact Us

  Scenario: User submits feedback through contact form
    When I open the contact form and submit it with valid data
    Then I should see the home button as a sign of success
