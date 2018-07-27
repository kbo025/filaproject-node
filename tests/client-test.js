'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
  logging: function () {}
}

TicketModel = {
  belongsTo: sinon.spyCall()
}

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

  t.true(ClientStub.hasOne.called, 'ClientModel.hasOne was executed')
  t.true(ClientStub.hasOne.calledWith(TicketStub), 'Argument should be the TicketModel')
})
