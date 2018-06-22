'use estrict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.export = function setupAgentModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define(
    'agent',
    {
      uuid: {type: Sequelize.STRING, allowNull: false},
      username: {type: Sequelize.STRING, allowNull: false},
      name: {type: Sequelize.STRING, allowNull: false},
      hostname: {type: Sequelize.STRING, allowNull: false},
      pid: {type: Sequelize.INTEGER, allowNull: false},
      conected: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false}
    }
  )
}
