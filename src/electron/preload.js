import electron from 'electron'

import store from './store'

process.once('loaded', () => {
  global.electron = electron.remote
  global.store = store
})
