const chalk = require('chalk')

function error (string) {console.log(chalk.red(string))}

function warning (string) { console.log(chalk.keyword('orange')(string))}

function socketLog (string) { console.log(chalk.blue(string))}

const usernameLog = chalk.bgGreen
const pathLog = chalk.green

module.exports = {
  wifi: false,
  setTimeout: 0,
  error,
  warning,
  socketLog,
  usernameLog,
  pathLog,
}
