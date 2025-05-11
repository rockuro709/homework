import TestData from "../testData/testData.js";
import ProductCard from "../pageobjects/components/productCard.js";
import CartPage from "../pageobjects/cartPage.js";
import Header from "../pageobjects/components/header.js";
import ProductPage from "../pageobjects/productPage.js";

describe("Cart Tests", () => {
  it("adds a product to the cart and verifies it appears in the cart summary", async () => {
    const name = await (
      await ProductCard.getNameById(TestData.idProduct[0])
    ).getText();
    await CartPage.addToCartAndViewCart(TestData.idProduct[0]);
    await expect(CartPage.namesOfItemsInCart[0]).toHaveText(name);
  });

  it("removes a product from the cart and verifies empty cart", async () => {
    await Header.waitAndClick(Header.cartButton);
    await CartPage.waitAndClick(CartPage.deleteButtonsOfItemsInCart[0]);
    await expect(CartPage.emptyCartAlert).toBeDisplayed();
  });

  it("adds same product few times and verifies it appears and its quantity in the cart summary", async () => {
    const name = await (
      await ProductCard.getNameById(TestData.idProduct[1])
    ).getText();
    await CartPage.addToCartFewTimesAndViewCart(
      TestData.idProduct[1],
      TestData.quantityToCart[0]
    );
    await expect(CartPage.namesOfItemsInCart[0]).toHaveText(name);
    await expect(CartPage.quantityOfItemsInCart[0]).toHaveText(
      `${TestData.quantityToCart[0]}`
    );
  });

  it("removes several items of the same product at a time from the cart and verifies empty cart", async () => {
    await Header.waitAndClick(Header.cartButton);
    await CartPage.waitAndClick(CartPage.deleteButtonsOfItemsInCart[0]);
    await expect(CartPage.emptyCartAlert).toBeDisplayed();
  });

  it("goes to product page, sets number of items, adds to cart and verifies it appears and its quantity in the cart summary", async () => {
    const name = await (
      await ProductCard.getNameById(TestData.idProduct[2])
    ).getText();
    await ProductPage.addToCartWithQuantityAndViewCart(
      TestData.idProduct[2],
      TestData.quantityToCart[1]
    );
    await expect(CartPage.namesOfItemsInCart[0]).toHaveText(name);
    await expect(CartPage.quantityOfItemsInCart[0]).toHaveText(
      `${TestData.quantityToCart[1]}`
    );
  });
});
