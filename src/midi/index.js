import { arrange } from '../core'
import In from './In'
import Out from './Out'

export default function Midi() {

  // TODO Currying!
  function out(config, score) {
    return arrange(Out(config), score)
  }

  return { threeOsc }
}
