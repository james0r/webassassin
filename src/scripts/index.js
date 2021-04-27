import '@ryangjchandler/spruce'
import 'alpinejs'
import helpers from './helpers.js'

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

const alpineComponents = require.context('./components/', true, /\.js$/)

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

// Add some data to our state management library
// https://spruce.ryangjchandler.co.uk/quick-start
window.Spruce.store('success', {
  message: '✅ Spruce state managament is armed and ready.',
});