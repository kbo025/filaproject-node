'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
  logging: function () {}
}

let TicketStub = {
  belongsTo: sinon.spy()
}

let AdminStub = {
  hasMany: sinon.spy()
}

let SerieStub = {
  belongsToMany: sinon.spy()
}

let AgentStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  AgentStub = {
    hasOne: sandbox.spy(),
    belongsTo:  sandbox.spy(),
    belongsToMany: sandbox.spy()
  }

  const setputDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/ticket': () => TicketStub,
    './models/admin': () => AdminStub,
    './models/serie': () => SerieStub
  })

  db = await setputDatabase(config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent Service shuld exist...')

  t.true(AgentStub.hasOne.called, 'AgentModel.hasOne was executed')
  t.true(AgentStub.belongsTo.called, 'AgentModel.belongsTo was executed')
  t.true(AgentStub.belongsToMany.called, 'AgentModel.belongsToMany was executed')

  t.true(AgentStub.hasOne.calledWith(TicketStub), 'Argument should be the TicketModel')
  t.true(AgentStub.belongsTo.calledWith(AdminStub), 'Argument should be the AdminModel')
  t.true(AgentStub.belongsToMany.calledWith(SerieStub), 'Argument should be the SerieModel')
})
