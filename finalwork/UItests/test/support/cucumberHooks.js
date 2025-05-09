import { Before, AfterStep, After } from "@wdio/cucumber-framework";
import fs from "fs";
import path from "path";
import { addAttachment } from "@wdio/allure-reporter";
import Header from "../pageobjects/components/header.js";

Before(async () => {
  await browser.url("/");
});

AfterStep(async function ({ result }) {
  if (result.status === "FAILED") {
    // Делаем скриншот при любой ошибке
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `error-${timestamp}.png`;
    const filePath = path.join("error-shots", fileName);
    fs.mkdirSync("error-shots", { recursive: true });
    await browser.saveScreenshot(filePath);
    addAttachment(
      "Screenshot on Error",
      fs.readFileSync(filePath),
      "image/png"
    );
  }
});

After("@needsLogout", async () => {
  await Header.logout();
});

After("@needsCleanup", async () => {
  await Header.deleteAccount();
});
