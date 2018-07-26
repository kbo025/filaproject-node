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
})
