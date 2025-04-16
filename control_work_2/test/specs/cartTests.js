import Header from "../pageobjects/components/header.js";
import TestData from "../testData.js";
import { expect } from "chai";
import ProductCard from "../pageobjects/components/productCard.js";
import Cart from "../pageobjects/cartPage.js";

describe("Cart Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });
  it("adds a product to the cart and verifies it appears in the cart summary", async () => {
    const name = await (
      await ProductCard.getName(TestData.idProduct[0])
    ).getText();
    await Cart.addToCart(TestData.idProduct[0]);
    expect(await Cart.firstItem.getText()).to.equal(name);
  });
});
