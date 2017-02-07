module.exports = {
  "extends": [
    "airbnb",
    "plugin:react/recommended"
  ],
  "plugins": [
    "react"
  ],
  "env": {
    "browser": true,
    "jest": true
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "func-names": ["error", "never"],
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": "off"
  },
};
