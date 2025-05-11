import { Given, When, Then } from "@wdio/cucumber-framework";
import ProductCard from "../pageobjects/components/productCard.js";
import CartPage from "../pageobjects/cartPage.js";
import TestData from "../testData/testData.js";
import Header from "../pageobjects/components/header.js";
import ProductPage from "../pageobjects/productPage.js";

When("I add the product to the cart and go to the cart", async function () {
  this.name = await (
    await ProductCard.getNameById(TestData.idProduct[0])
  ).getText();
  await CartPage.addToCartAndViewCart(TestData.idProduct[0]);
});

Then("I should see the product in the cart", async function () {
  await expect(CartPage.namesOfItemsInCart[0]).toHaveText(this.name);
});

Given("I am on the cart page", async () => {
  await Header.waitAndClick(Header.cartButton);
});

When("I remove the product from the cart", async () => {
  await CartPage.waitAndClick(await CartPage.deleteButtonsOfItemsInCart[0]);
});

Then("I should see the empty cart alert", async () => {
  await expect(CartPage.emptyCartAlert).toBeDisplayed();
});

When(
  "I add the product to the cart {int} times and go to the cart",
  async function (quantity) {
    this.expectedQuantity = quantity;
    this.name = await (
      await ProductCard.getNameById(TestData.idProduct[1])
    ).getText();
    await CartPage.addToCartFewTimesAndViewCart(
      TestData.idProduct[1],
      quantity
    );
  }
);

Then("I should see correct quantity of product in the cart", async function () {
  await expect(CartPage.quantityOfItemsInCart[0]).toHaveText(
    `${this.expectedQuantity}`
  );
});

When(
  "I add {int} items of the product to the cart from product page adn go to the cart",
  async function (quantity) {
    this.expectedQuantity = quantity;
    this.name = await (
      await ProductCard.getNameById(TestData.idProduct[2])
    ).getText();
    await ProductPage.addToCartWithQuantityAndViewCart(
      TestData.idProduct[2],
      quantity
    );
  }
);
