'use strict'
const fs = require('fs')
const path = require('path')
const { app } = require('electron')
const _ = require('lodash/fp')
const h = require('react-hyperscript')

const EDITOR_OPTIONS = {
  language: 'javascript',
  theme: 'vs-dark',
  selectOnLineNumbers: true,
  wordWrap: 'wordWrapColumn',
  formatOnType: true,
  wordWrapColumn: 80,
  rulers: [80],
  lineNumbers: 'on'
}

const SCORE_TEMPLATE = `module.exports = (um) => {
  return // TODO: Your song
}
`

const getInitialFile = () => {
  const openedFileArg = process.argv.find((s) =>
    s.startsWith('--um-opened-file=')
  )
  if (openedFileArg) {
    const openedFile = openedFileArg.split('=')[1]
    if (openedFile) return openedFile
  }
  return path.join(process.cwd(), 'newSong.um.js')
}

const getFileContents = (file) => {
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

const loadMonacoIntoEl = (el) => {
  const amdLoader = require('../../node_modules/monaco-editor/min/vs/loader.js')
  const amdRequire = amdLoader.require
  const amdDefine = amdLoader.require.define
  function uriFromPath(_path) {
    var pathName = path.resolve(_path).replace(/\\/g, '/')
    if (pathName.length > 0 && pathName.charAt(0) !== '/') {
      pathName = '/' + pathName
    }
    return encodeURI('file://' + pathName)
  }
  amdRequire.config({
    baseUrl: uriFromPath(
      path.join(__dirname, '../../node_modules/monaco-editor/min')
    )
  })
  // workaround monaco-css not understanding the environment
  self.module = undefined

  return new Promise((resolve) => {
    amdRequire(['vs/editor/editor.main'], () => {
      resolve(monaco.editor.create(el, EDITOR_OPTIONS))
    })
  })
}

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currFile: getInitialFile(),
      value: ''
    }
    this.initEditor = this.initEditor.bind(this)
    this.syncEditor = this.syncEditor.bind(this)
  }

  // async editorDidMount(editor, monaco) {
  //   let { currFile } = this.state
  //   let initialContents = await getFileContents(currFile)
  //   this.setState({ value: initialContents })
  //   editor.getModel().updateOptions({ tabSize: 2 })
  //   editor.focus()
  //
  //   editor.addAction({
  //     id: 'toggle-playback',
  //     label: 'Toggle playback',
  //     keybindings: [monaco.KeyMod.Shift | monaco.KeyCode.Space],
  //     contextMenuGroupId: 'transport',
  //     contextMenuOrder: 1.5,
  //     run: () => console.log('!!!') //transport.togglePlayback
  //   })
  // }

  // onChange(newValue, e) {
  //   let { currFile } = this.state
  //   // TODO Error handling
  //   fs.writeFile(currFile, newValue, (err) => {
  //     if (err) {
  //       console.error('Error writing file!')
  //       console.error(err)
  //     }
  //   })
  // }
  //
  componentDidUpdate(prevProps, prevState) {
    this.syncEditor(prevProps, prevState)
  }

  syncEditor(prevProps = {}, prevState = {}) {
    if (!this.__editor) return

    const { width: oldWidth, height: oldHeight } = prevProps
    const { width, height } = this.props
    if (oldWidth !== width || oldHeight !== height) {
      this.__editor.layout({ width, height })
    }

    const { value: oldValue } = prevState
    const { value } = this.state
    if (oldValue !== value) {
      this.__editor.setValue(value)
    }
  }

  initEditor(el) {
    if (this.__editor) return
    loadMonacoIntoEl(el).then((editor) => {
      this.__editor = editor
      this.syncEditor()
    })
  }

  render() {
    return h('div', { ref: this.initEditor })
  }
}

module.exports = Editor
