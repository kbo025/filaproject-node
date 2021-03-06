'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')
const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt({
    type: 'confirm',
    name: 'setup',
    message: 'This will destroy your database, are you sure?'
  })

  if (!answer.setup) {
    return console.log('Nothing happened :)')
  }

  const config = {
    database: process.env.DB_NAME || 'fila',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '123456',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    setup: true,
    logging: s => debug(s)
  }

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.log(`${chalk.red('[fatal error]')}  ${err.message}`)
  console.log(err.stack)
  process.exit(1)
}

setup()
