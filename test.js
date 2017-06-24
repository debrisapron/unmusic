let chai = require('chai')
let chaiSubset = require('chai-subset')

chai.use(chaiSubset)
global.expect = chai.expect
process.env.TEST = true

require('.')
