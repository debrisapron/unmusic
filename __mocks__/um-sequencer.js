let args = {}

function MockSequencer() {
  return {
    play: (...playArgs) => args.playArgs = playArgs,
    stop: (...stopArgs) => args.stopArgs = stopArgs
  }
}

MockSequencer.__args = args

export default MockSequencer
