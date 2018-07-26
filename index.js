'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupAdminModel = require('./models/admin')
const setupClientModel = require('./models/client')
const setupSerieModel = require('./models/serie')
const setupTicketModel = require('./models/ticket')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const ClientModel = setupClientModel(config)
  const AdminModel = setupAdminModel(config)
  const SerieModel = setupSerieModel(config)
  const TicketModel = setupTicketModel(config)

  AdminModel.hasMany(AgentModel)

  AgentModel.hasOne(TicketModel)
  AgentModel.belongsTo(AdminModel)
  AgentModel.belongsToMany(SerieModel, {through: 'SerieAgent'})

  SerieModel.belongsToMany(AgentModel, {through: 'SerieAgent'})
  SerieModel.hasOne(TicketModel)

  TicketModel.belongsTo(SerieModel)
  TicketModel.belongsTo(ClientModel)
  TicketModel.belongsTo(AgentModel)

  ClientModel.hasOne(TicketModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = {}
  const Client = {}
  const Admin = {}
  const Serie = {}
  const Ticket = {}

  return {
    Agent,
    Client,
    Admin,
    Serie,
    Ticket
  }
}
