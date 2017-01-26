# webpack-boilerplate

Boilerplate project for using Webpack with ES6 and React based on the setup outlined in
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

When generating a bundle for production, we run a number of additional optimisations.

```
yarn run build
```

## JavaScript

### Transpilation

This project uses [Babel](https://babeljs.io/) to transpile code written in ES6 to ES5 that is suitable for all supported browsers. Configuration for babel, including rules governing supported browsers can be found in `.babelrc`. Although Babel uses a series of plugins to transpile to ES2015, it also requires a polyfill to patch ES2015 features that aren't already supported by some browsers. This project uses [babel-preset-env](https://github.com/babel/babel-preset-env) to conditionally apply the both plugins and polyfill based on the browsers that need to be supported and configures it in `.babelrc`.

### Minification

**Production Only** After transpilation, JavaScript code is minified and code-shaking is performed. Code shaking uses static analysis to identify and remove code that isn't used anywhere in the application.

## Linting

### JavaScript

All JavaScript files automatically with [ESLint](http://eslint.org/). Rules are based on Airbnb's
[JavaScript styleguide](https://github.com/airbnb/javascript)

Rules superceding Airbnb's ruleset are defined in `.eslintrc.js` and a list of files to be excluded
from being linted is stored in `.eslintignore`.

### Styles

All style are linted with [style-lint](https://github.com/stylelint/stylelint), with rules based on
their own standard set.

Rules superceding the base ruleset are defined in `.stylelintrc.`

## Todos

- Add .dev domain support
- Add html validation
- Add favicon generation
- Add responsive image generation
- Templating for files (name, date etc)

## Comprehend

- Go back over images
- Go back over bundles
- Go back over code splitting
- What is NamedModulesPlugin
- Free variables
