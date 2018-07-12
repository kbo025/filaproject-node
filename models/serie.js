'use estrict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupSerieModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define(
    'serie',
    {
      uuid: {type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV4},
      name: {type: Sequelize.STRING, allowNull: false},
      from: {type: Sequelize.INTEGER, allowNull: false},
      to: {type: Sequelize.INTEGER, allowNull: false},
      status: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
    }
  )
}
