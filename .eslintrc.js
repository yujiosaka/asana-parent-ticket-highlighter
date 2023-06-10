/* eslint-env node */
module.exports = {
  extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
  env: {
    browser: true,
    webextensions: true,
    es2021: true,
    serviceworker: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
