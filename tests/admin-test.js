'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
  logging: function () {}
}

AgentStup = {
  belongsTo: sinon.spy()
}

let AdminStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  AdminStub = {
    hasMany: sandbox.spy()
  }

  const setputDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/admin': () => AdminStub,
  })

  db = await setputDatabase(config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('Admin', t => {
  t.truthy(db.Admin, 'Admin Service shuld exist...')

  t.true(AdminStub.hasMany.called, 'AdminModel.hasMany was executed')
  t.true(AdminStub.hasMany.calledWith(AgentStub), 'Argument should be the AgentModel')
})
