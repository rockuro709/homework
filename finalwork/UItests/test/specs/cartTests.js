import Header from "../pageobjects/components/header.js";
import TestData from "../testData/testData.js";
import ProductCard from "../pageobjects/components/productCard.js";
import CartPage from "../pageobjects/cartPage.js";

describe("Cart Tests", () => {
  beforeEach(async () => {
    await Header.navigate("https://www.automationexercise.com/");
  });

  it("adds a product to the cart and verifies it appears in the cart summary", async () => {
    const name = await (
      await ProductCard.getNameById(TestData.idProduct[0])
    ).getText();
    await CartPage.addToCart(TestData.idProduct[0]);
    await expect(CartPage.firstItem).toHaveText(name);
  });
});
