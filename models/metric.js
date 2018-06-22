'use estrict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.export = function setupMetricModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define(
    'metric',
    {
      type: {type: Sequelize.STRING, allowNull: false},
      value: {type: Sequelize.TEXT, allowNull: false}
    }
  )
}
