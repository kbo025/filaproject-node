'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const AdminFixture = require('./fixtures/admin')

let config = {
  logging: function () {}
}

AgentStup = {
  belongsTo: sinon.spy()
}

let id = 1
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
})

test.serial('Setup', t => {
  t.true(AdminStub.hasMany.called, 'AdminModel.hasMany was executed')
  t.true(AdminStub.hasMany.calledWith(AdminStub), 'Argument should be the AgentModel')
})

test.serial('Admin#findById', async t => {
  let admin = await db.admin.findById(id)

  t.true(AdminStub.findById.called, 'findById should be called')
  t.true(AdminStub.findById.calledOnce, 'findById should be called once')
  t.true(AdminStub.findById.calledWith(id), 'findById should be called with specified id')
  t.deepEqual(admin, adminFixtures.byId(id), 'should be the same')
})