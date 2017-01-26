module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true
  },
  "parserOptions": {
    "sourceType": "module"
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
