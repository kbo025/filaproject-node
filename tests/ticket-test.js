'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const TicketFixture = require('./fixtures/ticket')

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

let id = 1
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
})

test.serial('Setup', t => {
  t.true(TicketStub.belongsTo.called, 'AgentModel.hasMany was executed')
  t.true(TicketStub.belongsTo.calledWith(SerieStub), 'Argument should be the SeriecModel')
  t.true(TicketStub.belongsTo.calledWith(ClientStub), 'Argument should be the ClientModel')
  t.true(TicketStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentModel')
})

test.serial('Ticket#findById', async t => {
  let Ticket = await db.ticket.findById(id)

  t.true(TicketStub.findById.called, 'findById should be called')
  t.true(TicketStub.findById.calledOnce, 'findById should be called once')
  t.true(TicketStub.findById.calledWith(id), 'findById should be called with specified id')
  t.deepEqual(Ticket, TicketFixtures.byId(id), 'should be the same')
})