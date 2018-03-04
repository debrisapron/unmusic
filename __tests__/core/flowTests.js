describe('loop', () => {

  test('can flow a score thru a function', () => {
    let s = { actions: [
      { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
    ] }
    let expected = { actions: [
      { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
    ], loop: true }
    expect(um.flow(s, um.loop)).toMatchObject(expected)
  })

  test('can flow a bunch of functions to get a new function', () => {
    expect(um.flow(um.loop, um.tran(1))).toBeInstanceOf(Function)
  })
})
