import app from './app'

if (module.hot) {
  module.hot.accept(`./app.js`, () => app())
}
