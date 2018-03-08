(() => {

  // Setup um
  window.um = window.Unmusic.core.default()
  window.sf = window.Unmusic.soundfont.default
  let umPiano = sf.AcousticGrandPiano()
  umPiano.prepare({ audioContext: um.audioContext })

  // Setup editor
  let DEFAULT_CODE = `um.play(
  um.part(um.instr.sf.acousticGrandPiano(), 'A B C D')
)`
  let editor = ace.edit("editor")
  editor.setTheme("ace/theme/monokai")
  editor.session.setTabSize(2)
  editor.session.setMode("ace/mode/javascript")
  editor.setValue(window.localStorage.getItem('code') || DEFAULT_CODE)

  // Setup editor listeners
  editor.session.on('change', _.debounce(save, 500))
  editor.on('focus', deactivateQhHotkeys)

  // Setup buttons
  listen('#um-play', 'click', play)
  listen('#um-stop', 'click', stop)
  // Prevent buttons from receiving focus via click.
  listen('button', 'mousedown', (e) => e.preventDefault())

  // Setup Qwerty hancock
  let qh = new QwertyHancock({
    id: 'keyboard',
    width: 600,
    height: 35,
    octaves: 4,
    startNote: 'C2',
    whiteNotesColour: 'white',
    blackNotesColour: 'black',
    hoverColour: '#f3e939'
  })
  let qhHotkeysActive
  deactivateQhHotkeys()
  resetQhListeners()

  // Setup keyboard shortcuts
  let mousetrap = new Mousetrap(document.body)
  mousetrap.bind('ctrl+space', play)
  mousetrap.bind('escape', stop)

  //////////////////////////////////////////////////////////////////////////////

  function play() {
    let code = editor.getValue()
    eval(code)
  }

  function stop() {
    um.stop()
  }

  function save() {
    window.localStorage.setItem('code', editor.getValue())
  }

  function listen(sel, ev, cb) {
    document.querySelectorAll(sel)
      .forEach((el) => el.addEventListener(ev, cb))
  }

  function activateQhHotkeys() {
    qhHotkeysActive = true
    qh.setKeyboardActive(true)
  }

  function deactivateQhHotkeys() {
    qhHotkeysActive = false
    qh.setKeyboardActive(false)
  }

  function resetQhListeners() {
    let heldKeys = {}
    // TODO Convert text note to midi note.
    qh.keyDown = (note) => {
      if (!qhHotkeysActive) { activateQhHotkeys() }
      let action = {
        payload: { nn: note, vel: 127 },
        meta: { time: 0 }
      }
      action = umPiano.handle(action)
      action.meta.outputNode.connect(um.audioContext.destination)
      heldKeys[note] = action.meta.stopCbs[0]
    }
    qh.keyUp = (note) => {
      heldKeys[note](0)
      heldKeys[note] = null
    }
  }

})()
