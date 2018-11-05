'use strict'
const _ = require('lodash/fp')
const h = require('react-hyperscript')
const Split = require('react-split')
const Editor = require('./Editor')
const Log = require('./Log')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorWidth: 0,
      editorHeight: 0
    }
    this.setEditorContainerRef = this.setEditorContainerRef.bind(this)
    this.updateEditorDimensions = _.debounce(
      100,
      this.updateEditorDimensions
    ).bind(this)
  }

  componentDidMount() {
    this.updateEditorDimensions()
  }

  setEditorContainerRef(ref) {
    this._editorContainerRef = ref
    window.addEventListener('resize', this.updateEditorDimensions)
  }

  updateEditorDimensions() {
    this.setState({
      editorWidth: this._editorContainerRef.clientWidth,
      editorHeight: this._editorContainerRef.clientHeight
    })
  }

  render() {
    const { editorWidth, editorHeight } = this.state
    return h(
      Split,
      {
        sizes: [75, 25],
        direction: 'vertical',
        className: 'split-container',
        gutterSize: 3,
        onDrag: this.updateEditorDimensions
      },
      [
        h('div.split', [
          h(
            Split,
            {
              sizes: [75, 25],
              className: 'split-container',
              gutterSize: 3,
              onDrag: this.updateEditorDimensions
            },
            [
              h(
                'div.split.content.split-horizontal',
                {
                  ref: this.setEditorContainerRef
                },
                [h(Editor, { width: editorWidth, height: editorHeight })]
              ),
              h('div.split.content.split-horizontal', [h(Log)])
            ]
          )
        ]),
        h('div.split.content')
      ]
    )
  }
}

module.exports = App
