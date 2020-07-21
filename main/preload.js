const { ipcRenderer } = require('electron')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')

// Since we disabled nodeIntegration we can reintroduce
// needed node functionality here
process.once('loaded', () => {
  global.ipcRenderer = ipcRenderer

  const adapter = new FileSync(path.join(__dirname + '/data/db.json'))
  const db = low(adapter)

  // Set some defaults
  db.defaults({ requests: [] })
    .write()

  global.db = db
})
