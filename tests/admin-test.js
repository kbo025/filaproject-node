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

test('Admin', t => {
  t.truthy(db.Admin, 'Admin Service shuld exist...')
})
