import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import * as wdio from "eslint-plugin-wdio";

export default defineConfig([
  {
    files: ["test/**/*.js"],
    plugins: { js, wdio },
    extends: ["js/recommended"],
    rules: {
      ...wdio.configs.recommended.rules,
      "no-undef": "off",
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
    },
  },
]);
