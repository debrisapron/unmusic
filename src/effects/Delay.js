import Effect from './Effect'

function Delay(config) {
  return Effect((P) => {
    let params = _.isPlainObject(config) ? config : { wet: config }
    return P({
      dry: P.Gain(params.dry || 1),
      wet: P.Gain(params.wet || 0.5),
      delay: P.Delay(params.time || 0.5),
      feedback: P.Gain(params.feedback || 0.5)
    },
      'in > dry > out',
      'in > delay > wet > out',
      'delay > feedback > delay'
    )
  })
}

export default Delay
