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
    "comma-dangle": ["error", {
        "arrays": "never",
        "objects": "never",
        "imports": "never",
        "exports": "never",
        "functions": "ignore",
    }],
    "func-names": ["error", "never"],
    "no-param-reassign": "off",
    "import/no-extraneous-dependencies": "off"
  }
};
