var rewire = require('rewire')
  , assert = require('assert')
  , noop = function () {}
  , logger =
    { info: noop
    , log: noop
    , error: noop
    , warn: noop
    , debug: noop
    }

function createMockRequire() {
  var count = 0
  return function mockRequire(path) {
    var b = count += 1
    return function() {
      var o = {}
      o[path] = { count: b }
      return o
    }
  }
}
describe('component-loader-extends', function () {

  it('should return empty on empty input', function (done) {
    var extendComponents = require('..')
    assert.deepEqual(extendComponents([], logger), [])
    done()
  })

  it('should return both input components', function (done) {
    var extendComponents = rewire('..')
    extendComponents.__set__('require', createMockRequire())
    assert.deepEqual(extendComponents([ './a.js', './b.js' ], logger).length, 2)
    done()
  })

  it('should not return overridden components', function (done) {
    var extendComponents = rewire('..')
    extendComponents.__set__('require', createMockRequire())
    assert.deepEqual(extendComponents([ 'a', 'b', 'c', 'b' ], logger).map(function(fn) { return fn() })
      , [ { a: { count: 1 } }, { b: { count: 4 } }, { c: { count: 3 } } ])
    done()
  })

})
