export default class Base {
  async navigate(url) {
    await browser.url(url);
  }

  async waitForElementToDisappear(
    element,
    timeout = 5000,
    timeoutMsg = "Element did not disappear within the timeout"
  ) {
    await browser.waitUntil(
      async () => {
        return !(await element.isDisplayed());
      },
      {
        timeout,
        timeoutMsg,
      }
    );
  }
}
