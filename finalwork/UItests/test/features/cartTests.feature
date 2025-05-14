@cartTests
Feature: Cart functionality

  Scenario: Add a product to the cart and verify it appears in the cart summary
    When I add the product to the cart and go to the cart
    Then I should see the product in the cart

  Scenario: Remove a product from the cart and verify the empty cart
    Given I am on the cart page
    When I remove the product from the cart
    Then I should see the empty cart alert

  Scenario: Add same product few times and verify it appears and its quantity in the cart summary
    When I add the product to the cart 4 times and go to the cart
    Then I should see the product in the cart
    And I should see correct quantity of product in the cart

  Scenario: Remove several items of the same product at a time from the cart and verify empty cart
    Given I am on the cart page
    When I remove the product from the cart
    Then I should see the empty cart alert

  Scenario: Add certain number of the product to the cart from product page and verify it appears and its quantity in the cart summary
    When I add 9 items of the product to the cart from product page adn go to the cart
    Then I should see the product in the cart
    And I should see correct quantity of product in the cart
