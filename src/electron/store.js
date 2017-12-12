import electron from 'electron'
import path from 'path'
import fs from 'fs'

const userDataPath = (electron.app || electron.remote.app).getPath('userData')

const store = {
  get: (key, fallback = undefined) => {
    try {
      return JSON.parse(fs.readFileSync(path.join(userDataPath, `${key}.json`), 'utf8'))
    } catch (e) {
      return fallback
    }
  },
  set: (key, obj) => {
    fs.writeFileSync(path.join(userDataPath, `${key}.json`), JSON.stringify(obj, null, 2))
  }
}

export default store
