import 'alpinejs'
import './styles/style.css'
import './styles/style.scss'
import helpers from './scripts/helpers.js'

// Declare our namespace on the window
const namespace = 'webassassin'

window[namespace] = {
  helpers: {}
}

// Map helper functions to window[namespace].helpers
for (const [key, value] of Object.entries(helpers)) {
  window[namespace].helpers[key] = value
}

// Map alpine components from components directory to window[namespace].components
window[namespace].components = {}

const alpineComponents = require.context('./scripts/components/', true, /\.js$/)

alpineComponents.keys().forEach((key) => {
  const component = alpineComponents(key).default

  // If a component has a name defined use the name, otherwise use the path as the component name
  const name = component.name
    ? component.name
    : key
        .replace(/\.(\/|js)/g, '')
        .replace(/(\/|-|_|\s)\w/g, (match) => match.slice(1).toUpperCase())

  window[namespace].components[name] = component.component
})
