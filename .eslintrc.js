module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "plugin:node/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-inferrable-types": [
      "warn",
      {
        ignoreParameters: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "node/no-unsupported-features/es-syntax": 0,
    "node/no-unpublished-import": 0,
    "node/no-missing-import": 0,
  },
}
