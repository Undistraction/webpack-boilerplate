import app from './app'
import '../css/app.css'

if (module.hot) {
  module.hot.accept(`./app.js`, () => app())
}
