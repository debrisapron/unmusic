// test('Should return seq if parsing a seq', (assert) => {
//   let seq = parse('69 x---|x---')
//   assert.equal(parse(seq), seq)
//   assert.end()
// })
//
// test('Can parse a seq string with a numeric note instruction', (assert) => {
//   let seq = '69 x---|x---|x---|x---'
//   let expected = [
//     { time: 0,   type: 'note', nn: 69 },
//     { time: 1/4, type: 'note', nn: 69 },
//     { time: 1/2, type: 'note', nn: 69 },
//     { time: 3/4, type: 'note', nn: 69 },
//     { time: 1,   type: 'end' }
//   ]
//   assert.deepEqual(parse(seq), expected)
//   assert.end()
// })
//
// test('Can parse a seq string with a named note instruction', (assert) => {
//   let seq = 'C#4 x---|x---'
//   let expected = [
//     { time: 0,   type: 'note', nn: 61 },
//     { time: 1/4, type: 'note', nn: 61 },
//     { time: 1/2, type: 'end' }
//   ]
//   assert.deepEqual(parse(seq), expected)
//   assert.end()
// })
//
// test('Can parse a seq string with a custom instruction', (assert) => {
//   let seq = 'kick x---|x---'
//   let expected = [
//     { time: 0,   type: 'custom', name: 'kick' },
//     { time: 1/4, type: 'custom', name: 'kick' },
//     { time: 1/2, type: 'end' }
//   ]
//   assert.deepEqual(parse(seq), expected)
//   assert.end()
// })
//
// // test('Can parse a seq string with durations in the pattern', (assert) => {
// //   let seq = '1 x_--|x__-|x---|x___'
// //   let expected = [
// //     { time: 0,   type: 'note', nn: 1, dur: 1/8 },
// //     { time: 1/4, type: 'note', nn: 1, dur: 3/16 },
// //     { time: 1/4, type: 'note', nn: 1 },
// //     { time: 1/4, type: 'note', nn: 1, dur: 1/4 },
// //     { time: 1/4, type: 'end' }
// //   ]
// //   assert.deepEqual(parse(seq), expected)
// //   assert.end()
// // })
//
// test('Can set params for seq', (assert) => {
//   let seq = 'd=1/8 v=127 foo=bar 69 x---|x---'
//   let expected = {
//     time: 0, type: 'note', nn: 69, dur: 1/8, vel: 127, foo: 'bar'
//   }
//   assert.deepEqual(parse(seq)[0], expected)
//   assert.end()
// })
//
// test('Can use shorthand for fractions', (assert) => {
//   let seq = 'd=/8 69 x---'
//   let expected = { time: 0, type: 'note', nn: 69, dur: 1/8 }
//   assert.deepEqual(parse(seq)[0], expected)
//   assert.end()
// })
//
// test('Should interpret fractions as durations', (assert) => {
//   let seq = '/8 69 x---'
//   let expected = { time: 0, type: 'note', nn: 69, dur: 1/8 }
//   assert.deepEqual(parse(seq)[0], expected)
//   assert.end()
// })
