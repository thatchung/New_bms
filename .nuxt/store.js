import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const VUEX_PROPERTIES = ['state', 'getters', 'actions', 'mutations']

let store = {};

(function updateModules () {
  store = normalizeRoot(require('..\\store\\index.js'), 'store/index.js')

  // If store is an exported method = classic mode (deprecated)

  if (typeof store === 'function') {
    return console.warn('Classic mode for store/ is deprecated and will be removed in Nuxt 3.')
  }

  // Enforce store modules
  store.modules = store.modules || {}

  resolveStoreModules(require('..\\store\\modules\\account\\index.js'), 'modules/account/index.js')
  resolveStoreModules(require('..\\store\\modules\\common\\index.js'), 'modules/common/index.js')
  resolveStoreModules(require('..\\store\\modules\\investment\\index.js'), 'modules/investment/index.js')
  resolveStoreModules(require('..\\store\\modules\\mission\\index.js'), 'modules/mission/index.js')
  resolveStoreModules(require('..\\store\\modules\\page\\index.js'), 'modules/page/index.js')
  resolveStoreModules(require('..\\store\\modules\\permission\\index.js'), 'modules/permission/index.js')
  resolveStoreModules(require('..\\store\\modules\\account\\getters.js'), 'modules/account/getters.js')
  resolveStoreModules(require('..\\store\\modules\\common\\mutations.js'), 'modules/common/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\investment\\actions.js'), 'modules/investment/actions.js')
  resolveStoreModules(require('..\\store\\modules\\investment\\getters.js'), 'modules/investment/getters.js')
  resolveStoreModules(require('..\\store\\modules\\permission\\mutations.js'), 'modules/permission/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\account\\actions.js'), 'modules/account/actions.js')
  resolveStoreModules(require('..\\store\\modules\\mission\\actions.js'), 'modules/mission/actions.js')
  resolveStoreModules(require('..\\store\\modules\\mission\\getters.js'), 'modules/mission/getters.js')
  resolveStoreModules(require('..\\store\\modules\\account\\mutations.js'), 'modules/account/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\mission\\mutations.js'), 'modules/mission/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\page\\actions.js'), 'modules/page/actions.js')
  resolveStoreModules(require('..\\store\\modules\\page\\getters.js'), 'modules/page/getters.js')
  resolveStoreModules(require('..\\store\\modules\\common\\actions.js'), 'modules/common/actions.js')
  resolveStoreModules(require('..\\store\\modules\\page\\mutations.js'), 'modules/page/mutations.js')
  resolveStoreModules(require('..\\store\\modules\\permission\\actions.js'), 'modules/permission/actions.js')
  resolveStoreModules(require('..\\store\\modules\\permission\\getters.js'), 'modules/permission/getters.js')
  resolveStoreModules(require('..\\store\\modules\\common\\getters.js'), 'modules/common/getters.js')
  resolveStoreModules(require('..\\store\\modules\\investment\\mutations.js'), 'modules/investment/mutations.js')

  // If the environment supports hot reloading...

  if (process.client && module.hot) {
    // Whenever any Vuex module is updated...
    module.hot.accept([
      '..\\store\\index.js',
      '..\\store\\modules\\account\\index.js',
      '..\\store\\modules\\common\\index.js',
      '..\\store\\modules\\investment\\index.js',
      '..\\store\\modules\\mission\\index.js',
      '..\\store\\modules\\page\\index.js',
      '..\\store\\modules\\permission\\index.js',
      '..\\store\\modules\\account\\getters.js',
      '..\\store\\modules\\common\\mutations.js',
      '..\\store\\modules\\investment\\actions.js',
      '..\\store\\modules\\investment\\getters.js',
      '..\\store\\modules\\permission\\mutations.js',
      '..\\store\\modules\\account\\actions.js',
      '..\\store\\modules\\mission\\actions.js',
      '..\\store\\modules\\mission\\getters.js',
      '..\\store\\modules\\account\\mutations.js',
      '..\\store\\modules\\mission\\mutations.js',
      '..\\store\\modules\\page\\actions.js',
      '..\\store\\modules\\page\\getters.js',
      '..\\store\\modules\\common\\actions.js',
      '..\\store\\modules\\page\\mutations.js',
      '..\\store\\modules\\permission\\actions.js',
      '..\\store\\modules\\permission\\getters.js',
      '..\\store\\modules\\common\\getters.js',
      '..\\store\\modules\\investment\\mutations.js',
    ], () => {
      // Update `root.modules` with the latest definitions.
      updateModules()
      // Trigger a hot update in the store.
      window.$nuxt.$store.hotUpdate(store)
    })
  }
})()

// createStore
export const createStore = store instanceof Function ? store : () => {
  return new Vuex.Store(Object.assign({
    strict: (process.env.NODE_ENV !== 'production')
  }, store))
}

function normalizeRoot (moduleData, filePath) {
  moduleData = moduleData.default || moduleData

  if (moduleData.commit) {
    throw new Error(`[nuxt] ${filePath} should export a method that returns a Vuex instance.`)
  }

  if (typeof moduleData !== 'function') {
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData)
  }
  return normalizeModule(moduleData, filePath)
}

function normalizeModule (moduleData, filePath) {
  if (moduleData.state && typeof moduleData.state !== 'function') {
    console.warn(`'state' should be a method that returns an object in ${filePath}`)

    const state = Object.assign({}, moduleData.state)
    // Avoid TypeError: setting a property that has only a getter when overwriting top level keys
    moduleData = Object.assign({}, moduleData, { state: () => state })
  }
  return moduleData
}

function resolveStoreModules (moduleData, filename) {
  moduleData = moduleData.default || moduleData
  // Remove store src + extension (./foo/index.js -> foo/index)
  const namespace = filename.replace(/\.(js|mjs)$/, '')
  const namespaces = namespace.split('/')
  let moduleName = namespaces[namespaces.length - 1]
  const filePath = `store/${filename}`

  moduleData = moduleName === 'state'
    ? normalizeState(moduleData, filePath)
    : normalizeModule(moduleData, filePath)

  // If src is a known Vuex property
  if (VUEX_PROPERTIES.includes(moduleName)) {
    const property = moduleName
    const storeModule = getStoreModule(store, namespaces, { isProperty: true })

    // Replace state since it's a function
    mergeProperty(storeModule, moduleData, property)
    return
  }

  // If file is foo/index.js, it should be saved as foo
  const isIndexModule = (moduleName === 'index')
  if (isIndexModule) {
    namespaces.pop()
    moduleName = namespaces[namespaces.length - 1]
  }

  const storeModule = getStoreModule(store, namespaces)

  for (const property of VUEX_PROPERTIES) {
    mergeProperty(storeModule, moduleData[property], property)
  }

  if (moduleData.namespaced === false) {
    delete storeModule.namespaced
  }
}

function normalizeState (moduleData, filePath) {
  if (typeof moduleData !== 'function') {
    console.warn(`${filePath} should export a method that returns an object`)
    const state = Object.assign({}, moduleData)
    return () => state
  }
  return normalizeModule(moduleData, filePath)
}

function getStoreModule (storeModule, namespaces, { isProperty = false } = {}) {
  // If ./mutations.js
  if (!namespaces.length || (isProperty && namespaces.length === 1)) {
    return storeModule
  }

  const namespace = namespaces.shift()

  storeModule.modules[namespace] = storeModule.modules[namespace] || {}
  storeModule.modules[namespace].namespaced = true
  storeModule.modules[namespace].modules = storeModule.modules[namespace].modules || {}

  return getStoreModule(storeModule.modules[namespace], namespaces, { isProperty })
}

function mergeProperty (storeModule, moduleData, property) {
  if (!moduleData) {
    return
  }

  if (property === 'state') {
    storeModule.state = moduleData || storeModule.state
  } else {
    storeModule[property] = Object.assign({}, storeModule[property], moduleData)
  }
}
