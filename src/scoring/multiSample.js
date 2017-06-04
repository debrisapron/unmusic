let path = require('path')
let URL = require('url').URL
let _ = require('lodash/fp')
let multi = require('./multi')

let zoneKeyFromFile = (file) => {
  return _.camelCase(path.basename(file).replace(/\.[^/.]+$/, ''))
}

let zoneKeyFromUrl = (url) => {
  let file = _.last(new URL(url).pathname.split('/'))
  return _.camelCase(file.replace(/\.[^/.]+$/, ''))
}

let sampleParamsFrom = _.curry((sampleType, thing) => {
  if (!_.isString(thing)) return thing
  return { [sampleType]: thing }
})

// Exports

let multiSample = ({ files, urls }, score) => {
  let zones = {}
  if (files) {
    let fileZones
    if (Array.isArray(files)) {
      fileZones = _.zipObject(files.map(zoneKeyFromFile), files.map(sampleParamsFrom('file')))
    }
    if (_.isPlainObject(files)) {
      fileZones = _.mapValues(sampleParamsFrom('file'))
    }
    zones = _.merge(zones, fileZones)
  }
  if (urls) {
    let urlZones
    if (Array.isArray(urls)) {
      urlZones = _.zipObject(urls.map(zoneKeyFromUrl), urls.map(sampleParamsFrom('url')))
    }
    if (_.isPlainObject(urls)) {
      urlZones = _.mapValues(sampleParamsFrom('url'))
    }
    zones = _.merge(zones, urlZones)
  }
  return multi({ zones, type: 'sample' }, score)
}

module.exports = multiSample

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('multiSample', () => {

    it('can add name-mapped samples to the vgraph of every trig in a score', () => {
      let score = { actions: [
        { type: 'TRIG', payload: { time: 0,   name: 'fooBar', dur: 1/4 } },
        { type: 'TRIG', payload: { time: 1/4, name: 'b',      dur: 1/4 } },
        { type: 'NOOP', payload: { time: 3/4 } }
      ] }
      let expScore = { actions: [
        { type: 'TRIG', payload: { time: 0,   name: 'fooBar', dur: 1/4, vgraph: {
          node_0: { type: 'sample', params: { file: 'blah/foo_bar.wav', name: 'fooBar' } }
        } } },
        { type: 'TRIG', payload: { time: 1/4, name: 'b',   dur: 1/4, vgraph: {
          node_0: { type: 'sample', params: { file: 'blah/baz.wav', name: 'b' } }
        } } },
        { type: 'NOOP', payload: { time: 3/4 } }
      ] }
      let files = ['blah/foo_bar.wav', 'blah/baz.wav', 'blah/nope.mp3']
      expect(multiSample({ files }, score)).to.deep.equal(expScore)
    })
  })
}
