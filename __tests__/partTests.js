describe('part', () => {

  test('can set the callback for every action in a score', () => {
    let foo = () => {}
    let score = { actions: [
      { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4 } },
      { type: 'NOOP', payload: { time: 3/4 } }
    ] }
    let expScore = { actions: [
      { type: 'NOTE', payload: { time: 0,   nn: 69, dur: 1/4, callback: foo } },
      { type: 'NOOP', payload: { time: 3/4 } }
    ] }
    expect(um.part(foo, score)).toMatchObject(expScore)
  })
})
