import globals from "globals"
import js from "@eslint/js"
import stylisticJs from "@stylistic/eslint-plugin-js"

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node },
      ecmaVersion: "latest",
    },
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/semi": ["error", "never"],
      eqeqeq: "error",
      "no-console": "off",
      "no-unused-vars": "off",
    },
    ignores: ["dist/**"],
  },
]