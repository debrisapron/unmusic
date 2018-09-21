window.__main = () => {
  window.__editor.addAction({
    // An unique identifier of the contributed action.
    id: "my-unique-id",

    // A label of the action that will be presented to the user.
    label: "My Label!!!",

    // An optional array of keybindings for the action.
    keybindings: [
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.F10,
      // chord
      monaco.KeyMod.chord(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_K,
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_M
      )
    ],

    // A precondition for this action.
    precondition: null,

    // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
    keybindingContext: null,

    contextMenuGroupId: "navigation",

    contextMenuOrder: 1.5,

    // Method that will be executed when the action is triggered.
    // @param editor The editor instance is passed in as a convinience
    run: function(ed) {
      alert("i'm running => " + ed.getPosition());
      return null;
    }
  });
};

// const csound = require("csound-api");
// const Csound = csound.Create();
// csound.SetOption(Csound, "--output=dac");
// csound.CompileOrc(
//   Csound,
//   `
//   0dbfs = 1
//   giFunctionTableID ftgen 0, 0, 16384, 10, 1
//   instr A440
//     outc oscili(0.5 * 0dbfs, 440, giFunctionTableID)
//   endin
// `
// );
// csound.ReadScore(
//   Csound,
//   `
//   i "A440" 0 1
//   e
// `
// );
// if (csound.Start(Csound) === csound.SUCCESS) csound.Perform(Csound);
// csound.Destroy(Csound);

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
