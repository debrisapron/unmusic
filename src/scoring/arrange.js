let _ = require('lodash/fp')

let arrange = (dest, score) => _.pipe(_.castArray(dest))(score)

module.exports = arrange

////////////////////////////////////////////////////////////////////////////////

if (process.env.TEST) {

  describe('arrange', () => {

    it('can pipe a value through any number of functions', () => {
      let inc = (x) => x + 1
      let dbl = (x) => x * 2
      expect(arrange(inc, 1)).to.equal(2)
      expect(arrange([inc, dbl], 1)).to.equal(4)
    })    
  })
}
