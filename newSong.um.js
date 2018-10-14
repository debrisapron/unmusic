module.exports = (um) => {

  let orch = um.orch(`
    instr hihat
    aamp      expon     1,  0.1,   0.01
    arand     rand      aamp
    outs arand*0.5, arand*0.5
    endin

    instr snare
    aenv1  expon  1, 0.03, 0.5
    a1   oscili aenv1, 147
    aamp      expon     1,  0.2,   0.01
    arand     rand      aamp
    outs a1+(arand*0.5), a1+(arand*0.5)
    endin

    instr kick
    k1  expon    100, .2, 50
    aenv expon 1, 0.15, 0.01
    a1  poscil    1, k1
    outs a1*aenv, a1*aenv
    endin`
  )

  return um.flow(
    um.mix(
      '/8 kick  kick  kick  kick ',
      '/8 _     _     snare _    ',
      '/8 hihat hihat hihat hihat'
    ),
    um.tempo(140),
    um.loop,
    orch
  )
}
