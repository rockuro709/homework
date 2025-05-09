@checkoutAndPaymentTests
Feature: Checkout and Payment

  Scenario: Complete purchase with new user registration while checkout
    When I add the product to the cart and go to the cart
    Then I proceed to checkout and create new account
    And I place, confirm and pay order
    And I should see invoice button as sign of successfull payment

  @needsLogout
  Scenario: Complete purchase with login before checkout
    When I add the product to the cart and go to the cart
    Then I proceed to checkout
    And I place, confirm and pay order
    And I should see invoice button as sign of successfull payment
    
  @needsCleanup
  Scenario: Completes purchase with login while checkout
    When I add the product to the cart and go to the cart
    Then I proceed to checkout and login with existed user
    And I place, confirm and pay order
    And I should see invoice button as sign of successfull payment
