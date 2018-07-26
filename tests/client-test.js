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

test('Client', t => {
  t.truthy(db.Client, 'Client Service shuld exist...')
})
