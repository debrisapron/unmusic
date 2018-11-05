'use strict'
const h = require('react-hyperscript')
const Inspector = require('react-inspector').default

class Log extends React.Component {
  constructor(props) {
    super(props)
    this.state = { entries: [{ foo: { bar: { baz: 1 } } }] }
  }

  render() {
    const { entries } = this.state
    return h(
      'div.content',
      entries.map((entry, idx) =>
        h(Inspector, { theme: 'chromeDark', data: entry, key: idx })
      )
    )
  }
}

module.exports = Log
