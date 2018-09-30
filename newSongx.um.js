return orch(
  `
  sr = 44100
  nchnls = 2

  instr hihat
  aamp      expon     1000,  0.1,   10
  arand     rand      aamp
  outs arand, arand
  endin

  instr snare
  aenv1  expon  10000, 0.03, 0.5
  a1   oscili aenv1, 147
  aamp      expon     1000,  0.2,   10
  arand     rand      aamp
  outs a1+arand, a1+arand
  endin

  instr kick
  k1  expon    100, .2, 50
  aenv expon 1, 0.15, 0.01
  a1  poscil    10000, k1
  outs a1*aenv, a1*aenv
  endin`,

  arrange('kick', 'C')
)
