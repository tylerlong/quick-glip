import childProcess from 'child_process'
import detectPort from 'detect-port'
import electron from 'electron'
import path from 'path'
import fs from 'fs'
import untildify from 'untildify'

import store from './store'

let pgwebPath = path.join(__dirname, process.platform, 'pgweb' + process.platform === 'win32' ? '.exe' : '')

const fileExists = (file) => {
  return fs.existsSync(untildify(file))
}

const tempPath = (electron.app || electron.remote.app).getPath('temp')
const tempFilePath = (name, ext) => {
  return path.join(tempPath, `${name}.${ext}`)
}

process.once('loaded', () => {
  global.platform = process.platform
  global.electron = electron.remote
  global.childProcess = childProcess
  global.detectPort = detectPort
  global.pgwebPath = pgwebPath
  global.store = store
  global.fileExists = fileExists
  global.writeFileSync = fs.writeFileSync
  global.unlinkSync = fs.unlinkSync
  global.tempPath = tempPath
  global.tempFilePath = tempFilePath
})
