export default class Base {
  async waitAndClick(locator) {
    await locator.waitForDisplayed();
    await locator.click();
  }
  async waitAndSetValue(locator, value) {
    await locator.waitForDisplayed();
    await locator.setValue(value);
  }
}
