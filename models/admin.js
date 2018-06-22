'use estrict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.export = function setupAdminModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define(
    'admin',
    {
      uuid: {type: Sequelize.STRING, allowNull: false},
      name: {type: Sequelize.STRING, allowNull: false},
    }
  )
}
