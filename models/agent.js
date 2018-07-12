'use estrict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAgentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define(
    'agent',
    {
      uuid: {type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV4},
      name: {type: Sequelize.STRING, allowNull: false},
      status: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
    }
  )
}
