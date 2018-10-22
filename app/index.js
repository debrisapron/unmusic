let Split = require('split.js')
let Editor = require('./Editor')

window.__main = () => {
  Editor.init(window.__editor)
}

// let QwertyHancock = require("./qwerty-hancock");

// Setup splits

Split(['#a', '#b', '#c'], {
  gutterSize: 20,
  cursor: 'pointer',
  direction: 'vertical'
})
Split(['#d', '#editor-container', '#f'], {
  sizes: [15, 70, 15],
  gutterSize: 20,
  cursor: 'row-resize'
})

// Split(['#editor-container', '#sidebar-container'], {
//   sizes: [80, 20],
//   gutterSize: 8,
//   cursor: 'col-resize'
// })

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
