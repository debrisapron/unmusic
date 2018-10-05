let fs = require('fs')
let path = require('path')
let _ = require('lodash/fp')
let transport = require('./transport')
let ipcRenderer = require('electron').ipcRenderer
let um = require('unmusic-core')

let SCORE_TEMPLATE = `module.exports = (um) => {
  let {
    ${Object.keys(um).join(', ')}
  } = um

  return // TODO: Your song
}
`

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

let getFileContents = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, text) => {
      if (err) {
        if (err.code && err.code === 'ENOENT') {
          resolve(SCORE_TEMPLATE)
        } else {
          reject(err)
        }
        return
      }
      resolve(text)
    })
  })
}

let init = async (editor) => {
  let currFile = getInitialFile()
  let isSaving = false
  let initialContents = await getFileContents(currFile)
  let isPlaying = false

  editor.getModel().updateOptions({ tabSize: 2 })

  editor.setValue(initialContents)

  editor.addAction({
    id: 'toggle-playback',
    label: 'Toggle playback',
    keybindings: [monaco.KeyMod.Shift | monaco.KeyCode.Space],
    contextMenuGroupId: 'transport',
    contextMenuOrder: 1.5,
    run() {
      isPlaying ? transport.stop() : transport.play(editor.getValue())
      isPlaying = !isPlaying
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

  window.addEventListener('resize', _.debounce(100, () => editor.layout()))
}

module.exports = { init }
