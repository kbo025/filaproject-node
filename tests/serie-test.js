'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

let config = {
  logging: function () {}
}

let AgentStub = {
  hasOne: sinon.spy()
}

let TicketModel = {
  belongsTo: sinon.spy()
}

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

  t.true(SerieStub.hasOne.called, 'SerieModel.hasOne was executed')
  t.true(SerieStub.hasOne.calledWith(TicketStub), 'Argument should be the TicketModel')

  t.true(SerieStub.belongsToMany.called, 'SerieModel.belongsToMany was executed')
  t.true(SerieStub.belongsToMany.calledWith(AgentStub), 'Argument should be the AgentModel')
})
