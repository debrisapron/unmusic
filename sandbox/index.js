(() => {

  let DEFAULT_CODE = `um.play(um.part(um.sf.acousticGrandPiano, 'A B C D'))`
  let editor = ace.edit("editor")
  editor.setTheme("ace/theme/monokai")
  editor.session.setTabSize(2)
  editor.session.setMode("ace/mode/javascript")
  editor.setValue(window.localStorage.getItem('code') || DEFAULT_CODE)

  window.um = window.Unmusic.default()

  document.querySelector('#um-play').addEventListener('click', () => {
    let code = editor.getValue()
    eval(code)
  })

  document.querySelector('#um-stop').addEventListener('click', () => {
    um.stop()
  })

  editor.session.on('change', _.debounce(save, 500))

  function save() {
    window.localStorage.setItem('code', editor.getValue())
  }

})()
