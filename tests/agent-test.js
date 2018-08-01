'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const AgentFixture = require('./fixtures/Agent')

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

let id = 1
let AgentStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  AgentStub = {
    hasOne: sandbox.spy(),
    belongsTo:  sandbox.spy(),
    belongsToMany: sandbox.spy(),
    findById: sandbox.stub()
  }
  AgentStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.byId(id)))

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
})

test.serial('Setup', t => {
  t.true(AgentStub.hasOne.called, 'AgentModel.hasOne was executed')
  t.true(AgentStub.belongsTo.called, 'AgentModel.belongsTo was executed')
  t.true(AgentStub.belongsToMany.called, 'AgentModel.belongsToMany was executed')

  t.true(AgentStub.hasOne.calledWith(TicketStub), 'Argument should be the TicketModel')
  t.true(AgentStub.belongsTo.calledWith(AdminStub), 'Argument should be the AdminModel')
  t.true(AgentStub.belongsToMany.calledWith(SerieStub), 'Argument should be the SerieModel')
})

test.serial('Agent#findById', async t => {
  let agent = await db.Agent.findById(id)

  t.true(AgentStub.findById.called, 'findById should be called')
  t.true(AgentStub.findById.calledOnce, 'findById should be called once')
  t.true(AgentStub.findById.calledWith(id), 'findById should be called with specified id')
  t.deepEqual(agent, agentFixtures.byId(id), 'should be the same')
})
