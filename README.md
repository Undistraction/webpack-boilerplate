# Webpack Boilerplate

Simple project for using Webpack with ES6 and React based on the setup outlined in
[Survive JS: Webpack](https://leanpub.com/survivejs-webpack).

## Package Management

This project uses [Yarn](https://yarnpkg.com/) for package management

## Setup

```
yarn
```

## Webpack

This project uses npm scripts to run Webpack.

### Development

Webpack run runs on `localhost:8080` by default and runs the application in memory. It uses HMR.

```
yarn run start
```

### Production

When generating a bundle for production, we run additional optimisations.

```
yarn run build
```

## JavaScript

### Transpilation

This project uses [Babel](https://babeljs.io/) to transpile code written in ES6 to ES5 that is suitable for all supported browsers. Configuration for babel, including rules governing supported browsers are found in `.babelrc`. Although Babel uses a series of plugins to transpile to ES2015, it also requires a polyfill to patch ES2015 features that aren't already supported by some browsers. This project uses [babel-preset-env](https://github.com/babel/babel-preset-env) to conditionally apply the both plugins and polyfill based on the browsers that need to be supported and configures it in `.babelrc`. It also uses a preset for React (and .jsx) support, and a plugin to enable HMR in React.

### Styles

This project uses PostCSS to extend CSS in various ways.

- [postcss-import](https://github.com/postcss/postcss-import) Allows Sass-style imports.
- [postcss-simple-vars](https://github.com/postcss/postcss-simple-vars) Sass-style variables.
- [postcss-nested](https://pawelgrzybek.com/from-sass-to-postcss/) Sass-style nested selectors.
- [postcss-color-function](https://github.com/postcss/postcss-color-function) Colour calculations.
- [postcss-next](https://github.com/MoOx/postcss-cssnext) Polyfills upcoming CSS standards, including adding prefixes as needed.

[CSS Modules](https://github.com/css-modules/css-modules) are also enabled.

### Browser Support

Both Babel and PostCSS are configured to provide support for the last two versions of all major browsers.

### Minification

**Production Only** After transpilation, JavaScript code is minified and code-shaking is performed. Code shaking uses static analysis to identify and remove code that isn't used anywhere in the application.

## Linting

### JavaScript

All JavaScript files automatically with [ESLint](http://eslint.org/). Rules based on Airbnb's [JavaScript styleguide](https://github.com/airbnb/javascript), with rules superseding Airbnb's ruleset defined in `.eslintrc.js` and a list of files excluded from linting stored in `.eslintignore`.

### Styles

All style linted with [style-lint](https://github.com/stylelint/stylelint), using rules based on
their own standard set.

Rules superseding the base ruleset are defined in `.stylelintrc.`

## Todos

- Add responsive image generation
- Templating for files (name, date etc)

## Comprehend

- Go back over images
- What is NamedModulesPlugin
- Free variables
