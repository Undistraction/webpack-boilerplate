import App from './components/App'
import '../css/app.css'

if (module.hot) {
  module.hot.accept(`./components/App.js`, () => App())
}
