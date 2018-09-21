let playJs = require('./playJs')

window.__main = () => {
  window.__editor.addAction({
    id: 'toggle-play',
    label: 'Toggle play/stop',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyCode.Space],
    contextMenuGroupId: 'playback',
    contextMenuOrder: 1.5,
    run(editor) {
      playJs(editor.getValue())
    }
  })
}

// let Split = require("split.js");
// let QwertyHancock = require("./qwerty-hancock");

// Setup splits

// Split(["#editor-container", "#sidebar-container"], {
//   sizes: [100, 0],
//   gutterSize: 0,
//   cursor: "col-resize"
// });

// Split(["#editor-container", "#footer-container"], {
//   direction: "vertical",
//   sizes: [80, 20],
//   gutterSize: 8,
//   cursor: "row-resize"
// });

// // Setup Qwerty hancock
// let qh = new QwertyHancock({
//   id: "keyboard",
//   width: "1000",
//   height: "60",
//   octaves: 7,
//   startNote: "C0",
//   whiteNotesColour: "white",
//   blackNotesColour: "black",
//   hoverColour: "#f3e939"
// });
