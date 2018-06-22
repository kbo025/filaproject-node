'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupAdminModel = require('./models/admin')
const setupClientModel = require('./models/client')
const setupSerieModel = require('./models/serie')
const setupMetricModel = require('./models/metric')

module.export = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)
  const ClientModel = setupClientModel(config)
  const AdminModel = setupAdminModel(config)
  const SerieModel = setupSerieModel(config)

  AdminModel.hasMany(AgentModel)
  ClientModel

  AgentModel.hasMany(MetricModel)
  MetricModel.belongsTo(AgentModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = {}
  const Metric = {}

  return {
    Agent,
    Metric
  }
}
