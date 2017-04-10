let _ = require('lodash/fp')

let route = (score, ...transformers) => {
  score = part(handleEvent, score)
  return _.pipe(...transformers)(score)
}

let isScore = (thing) => {
  return thing && (_.isString(thing) || thing.actions)
}

let composer = (fn) => {
  let inner = (...args) => {
    let opts = _.mergeAll(args.filter(_.negate(isScore)))
    let score = args.find(isScore)
    if (!score) {
      return (...args) => inner(...([opts].concat(args)))
    }
    return fn(score, opts)
  }
  return inner
}

let ping = composer((score, opts) => {
  score = _.cloneDeep(score)
  score.actions.forEach((action) => action.payload.graph = { ping: opts })
  return score
})

let handleEvent = (time, action) => {
  console.log(time, action)
}

play(
  route(
    'C C C C',
    ping({ foo: 'bar' })
  )
)
