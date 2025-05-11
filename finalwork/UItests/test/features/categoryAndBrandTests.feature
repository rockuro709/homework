@categoryAndBrandTests
Feature: Category and Brand selection

  Scenario: Select category and verify products
    When I select a category
    Then I should see only products from that category

  Scenario: Select brand and verify products
    When I select a brand
    Then I should see only products from that brand

  Scenario: Select brand and verify quantity of products
    When I select a brand with a certain number of products
    Then this number should match the displayed product cards