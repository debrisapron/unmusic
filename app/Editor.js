let fs = require('fs')
let path = require('path')
let _ = require('lodash/fp')
let playJs = require('./playJs')
let ipcRenderer = require('electron').ipcRenderer

let getInitialFile = () => {
  let openedFileArg = process.argv.find((s) =>
    s.startsWith('--um-opened-file=')
  )
  if (openedFileArg) {
    let openedFile = openedFileArg.split('=')[1]
    if (openedFile) return openedFile
  }
  return path.join(process.cwd(), 'newSong.um.js')
}

let init = (editor) => {
  let currFile = getInitialFile()
  console.log({ currFile })
  let isSaving = false

  editor.addAction({
    id: 'toggle-play',
    label: 'Toggle play/stop',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.Space],
    contextMenuGroupId: 'playback',
    contextMenuOrder: 1.5,
    run() {
      playJs(editor.getValue())
    }
  })

  editor.onDidChangeModelContent(
    _.debounce(1000, () => {
      // TODO Error handling
      fs.writeFile(currFile, editor.getValue(), (err) => {
        if (err) {
          console.error('Error writing file!')
          console.error(err)
        }
      })
    })
  )
}

module.exports = { init }
