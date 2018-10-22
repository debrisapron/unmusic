module.exports = (um) => {
  return um.midi({}, um.loop(um.seq('C D E F G A B C')))
}
