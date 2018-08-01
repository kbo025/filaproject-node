'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const ClientFixture = require('./fixtures/client')

let config = {
  logging: function () {}
}

TicketModel = {
  belongsTo: sinon.spyCall()
}

let id = 1
let ClientStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  ClientStub = {
    hasOne: sandbox.spy()
  }

  const setputDatabase = proxyquire('../', {
      './models/client': () => ClientStub,
      './models/ticket': () => TicketStub
  })

  db = await setputDatabase(config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('Client', t => {
  t.truthy(db.Client, 'Client Service shuld exist...')
})

test.serial('Setup', t => {
  t.true(ClientStub.hasOne.called, 'ClientModel.hasOne was executed')
  t.true(ClientStub.hasOne.calledWith(TicketStub), 'Argument should be the TicketModel')
})

test.serial('Client#findById', async t => {
  let Client = await db.client.findById(1)

  t.true(ClientStub.findById.called, 'findById should be called')
  t.true(ClientStub.findById.calledOnce, 'findById should be called once')
  t.true(ClientStub.findById.calledWith(id), 'findById should be called with specified id')
  t.deepEqual(Client, ClientFixtures.byId(id), 'should be the same')
})