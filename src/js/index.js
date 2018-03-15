import '../css/app.css'
import Root from './components/Root'

if (module.hot) {
  module.hot.accept(`./components/App.js`, () => Root())
}
