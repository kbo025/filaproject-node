'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
const SerieFixture = require('./fixtures/serie')

let config = {
  logging: function () {}
}

let AgentStub = {
  hasOne: sinon.spy()
}

let TicketModel = {
  belongsTo: sinon.spy()
}

let id = 1
let SerieStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  SerieStub = {
    hasOne: sandbox.spy(),
    belongsToMany: sandbox.spy()
  }

  const setputDatabase = proxyquire('../', {
    './models/agent': () => AgentStub,
    './models/ticket': () => TicketStub,
    './models/serie': () => SerieStub
  })

  db = await setputDatabase(config)
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})

test('Serie', t => {
  t.truthy(db.Serie, 'Serie Service shuld exist...')
})

test.serial('Setup', t => {
  t.true(SerieStub.hasOne.called, 'SerieModel.hasOne was executed')
  t.true(SerieStub.hasOne.calledWith(TicketStub), 'Argument should be the TicketModel')

  t.true(SerieStub.belongsToMany.called, 'SerieModel.belongsToMany was executed')
  t.true(SerieStub.belongsToMany.calledWith(AgentStub), 'Argument should be the AgentModel')
})

test.serial('Serie#findById', async t => {
  let Serie = await db.serie.findById(id)

  t.true(SerieStub.findById.called, 'findById should be called')
  t.true(SerieStub.findById.calledOnce, 'findById should be called once')
  t.true(SerieStub.findById.calledWith(id), 'findById should be called with specified id')
  t.deepEqual(Serie, SerieFixtures.byId(id), 'should be the same')
})