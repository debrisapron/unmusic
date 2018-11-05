// This is the entry point for the Electron app
'use strict'

const path = require('path')
const url = require('url')
const electron = require('electron')

const openedFile = process.argv[2] || ''

const createWindow = () => {
  const win = new electron.BrowserWindow({
    fullscreen: true,
    webPreferences: {
      zoomFactor: 1.5,
      additionalArguments: [`--um-opened-file=${openedFile}`]
    }
  })
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'src/index.html'),
      protocol: 'file:',
      slashes: true
    })
  )
  // win.webContents.openDevTools({ mode: 'right' })
}

electron.app.on('ready', createWindow)
