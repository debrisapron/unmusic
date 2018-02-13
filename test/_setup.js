import chai from 'chai'
import Unmusic from '../src'

global.expect = chai.expect

beforeEach(() => global.um = Unmusic())
