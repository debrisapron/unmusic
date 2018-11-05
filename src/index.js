'use strict'
const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./components/App')

const app = React.createElement(App)
const rootEl = document.getElementById('root')
ReactDOM.render(app, rootEl)
