import * as core from '../core'
import Tran from './Tran'

export function tran(amount, score) {
  return core.arrange(Tran(amount), score)
}

export { Tran }
