'use strict'

const Sequelize = require('sequelize')
let sequelize = null

module.export = function setupDataBase (config) {
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}
