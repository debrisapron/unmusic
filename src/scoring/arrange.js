let _ = require('lodash/fp')

let arrange = (dest, score) => _.pipe(_.castArray(dest))(score)

module.exports = arrange

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  test('can pipe a value through any number of functions', (assert) => {
    let inc = (x) => x + 1
    let dbl = (x) => x * 2
    assert.equal(arrange(inc, 1), 2)
    assert.equal(arrange([inc, dbl], 1), 4)
    assert.end()
  })
}
