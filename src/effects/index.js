import { arrange } from '../core'
import Delay from './Delay'

// TODO Currying!
export function delay(config, score) {
  return arrange(Delay(config), score)
}

export { Delay }
