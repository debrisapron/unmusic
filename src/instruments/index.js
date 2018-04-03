import { arrange } from '../core'
import ThreeOsc from './ThreeOsc'

export default function Instruments(P) {

  // TODO Currying!
  function threeOsc(config, score) {
    return arrange(ThreeOsc(P, config), score)
  }

  return { threeOsc }
}
