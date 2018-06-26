'use estrict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.export = function setupClientModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define(
    'client',
    {
        uuid: {type: Sequelize.STRING, allowNull: false},
        number: {type: Sequelize.INTEGER, allowNull: false},
        status: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
    }
  )
}
