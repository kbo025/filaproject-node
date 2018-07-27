'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
  logging: function () {}
}

let SerieStub = {
  hasOne: sinon.spy()
}

let ClientStub = {
  hasOne: sinon.spy() 
}

let AgentStub = {
  hasOne: sinon.spy()
}

let TicketStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  TicketStub = {
    belongsTo: sandbox.spy(),
  }

  const setputDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/ticket': () => TicketStub,
    './models/client': () => ClientStub,
    './models/serie': () => SerieStub
  })

  db = await setputDatabase(config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('Ticket', t => {
  t.truthy(db.Ticket, 'Ticket Service shuld exist...')
  
  t.true(TicketStub.belongsTo.called, 'AgentModel.hasMany was executed')
  t.true(TicketStub.belongsTo.calledWith(SerieStub), 'Argument should be the SeriecModel')
  t.true(TicketStub.belongsTo.calledWith(ClientStub), 'Argument should be the ClientModel')
  t.true(TicketStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentModel')
})
