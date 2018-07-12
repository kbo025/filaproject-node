'use estrict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupAdminModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define(
    'admin',
    {
      uuid: {type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV4},
      name: {type: Sequelize.STRING, allowNull: false}
    }
  )
}
