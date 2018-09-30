// This is the entry point for the Electron app

let path = require('path')
let url = require('url')
let electron = require('electron')

let openedFile = process.argv[2] || ''

function createWindow() {
  let win = new electron.BrowserWindow({
    fullscreen: true,
    webPreferences: {
      zoomFactor: 1.5,
      additionalArguments: [`--um-opened-file=${openedFile}`]
    }
  })
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'app/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
  win.webContents.openDevTools({ mode: 'right' })
}

electron.app.on('ready', createWindow)
