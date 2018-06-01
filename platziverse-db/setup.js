'use strict'

const debug = require('debug')('platziverse:db:setup')
const db = require('./')

async function setup () {
  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'Flor-2718',
    host: process.env.DB_HOST || '5432',
    dialect: 'postgres',
    setup: true,
    logging: s => debug(s)
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(1)
}

function handleFatalError (err) {
  console.log(err.message)
}

setup()
