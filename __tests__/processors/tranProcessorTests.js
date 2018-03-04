import MockSequencer from '../../__mocks__/um-sequencer.js'

describe('tran processor', () => {

  test('can transpose incoming actions', async () => {
    let returnedAction
    let cb = (action) => returnedAction = action
    await um.play(um.tran(1, um.arrange(cb, 'dur=0 M69')))
    let callback = MockSequencer.__args.playArgs[0][0].callback
    callback(0)
    expect(returnedAction.payload.nn).toEqual(70)
  })
})
