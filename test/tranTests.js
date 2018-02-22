describe('tran', () => {

  it('can transpose every note in a score', () => {
    let score = { actions: [
      { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
      { type: 'NOOP', payload: { time: 3/4 } }
    ] }
    let expScore = { actions: [
      { type: 'NOTE', payload: { time: 0,   nn: 57, dur: 1/4 } },
      { type: 'NOOP', payload: { time: 3/4 } }
    ] }
    expect(um.tran(-12, score)).to.deep.equal(expScore)
  })
})
