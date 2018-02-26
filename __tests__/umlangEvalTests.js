import evalUmlang from '../src/scoring/umlang/eval'

describe('umlang evaluator', () => {

  test('can eval a single note', () => {
    let s = 'A'
    let expected = [
      { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/4 } }
    ]
    expect(evalUmlang(s)).toMatchObject(expected)
  })

  test('can eval a trigger', () => {
    let s = 'foo'
    let expected = [
      { type: 'TRIG', payload: { time: 0, name: 'foo', dur: 1/4 } }
    ]
    expect(evalUmlang(s)).toMatchObject(expected)
  })

  test('can set duration', () => {
    let s = 'd=/8 A'
    let expected = [
      { type: 'NOTE', payload: { time: 0, nn: 69, dur: 1/8 } }
    ]
    expect(evalUmlang(s)).toMatchObject(expected)
  })

  test('can set octave', () => {
    let s = '> A'
    let expected = [
      { type: 'NOTE', payload: { time: 0, nn: 81, dur: 1/4 } }
    ]
    expect(evalUmlang(s)).toMatchObject(expected)
  })

  test('can chain different settings, notes and rests', () => {
    let s = '  < d=/8 C dur=/16 -10 /8 _ /4 M55 _  '
    let expected = [
      { type: 'NOTE', payload: { time: 0,     nn: 48, dur: 1/8 } },
      { type: 'NOTE', payload: { time: 1/8,   nn: 47, dur: 1/16 } },
      { type: 'NOTE', payload: { time: 5/16,  nn: 55, dur: 1/4 } },
      { type: 'NOOP', payload: { time: 13/16 } }
    ]
    expect(evalUmlang(s)).toMatchObject(expected)
  })
})
