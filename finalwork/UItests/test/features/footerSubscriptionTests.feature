@footerSubscriptionTests
Feature: Footer functionality

  Scenario: User subscribes to updates
    When I subscribe to updates with valid data
    Then I should see a success alert

  Scenario: User scrolls down and back up the page through scroll-up button
    When I scroll to the bottom and click the scroll-up button
    Then I should be back at the top and the scroll-up button should disappear
