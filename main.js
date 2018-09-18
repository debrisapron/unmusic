// This is the entry point for the Electron app

let path = require("path");
let url = require("url");
let electron = require("electron");

function createWindow() {
  let win = new electron.BrowserWindow({
    fullscreen: true,
    webPreferences: {
      zoomFactor: 1.5
    }
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );
  // win.webContents.openDevTools({ mode: 'right' })
}

electron.app.on("ready", createWindow);
