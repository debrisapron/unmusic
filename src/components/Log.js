'use strict'
const h = require('react-hyperscript')
const { Hook, Console, Decode } = require('console-feed')

class Log extends React.Component {
  constructor(props) {
    super(props)
    this.state = { logs: [] }
  }

  componentDidMount() {
    Hook(window.console, (log) =>
      this.setState(({ logs }) => ({ logs: logs.concat(Decode(log)) }))
    )
  }

  render() {
    const { logs } = this.state
    return h('div', { style: { backgroundColor: '#242424' } }, [
      h(Console, { logs, variant: 'dark' })
    ])
  }
}

module.exports = Log
