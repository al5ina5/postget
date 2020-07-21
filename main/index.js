// Native
const { join } = require('path')
const { format } = require('url')

// Packages
const remote = require('electron').remote
const { BrowserWindow, app, ipcMain, globalShortcut } = require('electron')
const isDev = require('electron-is-dev')
const prepareNext = require('electron-next')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, 'preload.js'),
    },
    frame: false,
    transparent: true,
    backgroundColor: '#141414'
  })

  const url = isDev
    ? 'http://localhost:8000'
    : format({
      pathname: join(__dirname, '../renderer/out/index.html'),
      protocol: 'file:',
      slashes: true,
    })

  mainWindow.loadURL(url)
}

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')
  createWindow()

  // globalShortcut.register('CommandOrControl+N', () => {
  //   createWindow()
  // })
})

// Quit the app once all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// listen the channel `message` and resend the received message to the renderer process

// ipcMain.on('window-close', (event, arg) => {
//   var window = remote.getCurrentWindow();
//   window.close();
// })
  // return false to prevent default browser behavior
  //