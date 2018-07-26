'use strict'

const test = require('ava')

let config = {
  logging: function () {}
}
let db = null

test.beforeEach(async () => {
  const setputDatabase = require('../')
  db = await setputDatabase(config)
})

test('Serie', t => {
  t.truthy(db.Serie, 'Serie Service shuld exist...')
})
