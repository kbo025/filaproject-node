/**
 *  STATUS TICKET
 *  0: en espera
 *  1: llamado
 *  2: en atendimiento
 *  3: no atendido
 *  4: atendido
 */

'use estrict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupClientModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define(
    'client',
    {
      uuid: {type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV4},
      number: {type: Sequelize.INTEGER, allowNull: false},
      status: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0}
    }
  )
}
