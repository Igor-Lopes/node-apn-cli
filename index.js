var program = require('commander')
var apn = require('apn')
var log = console.log
var chalk = require('chalk')
var config = require('./config.js')
var apnProvider = new apn.Provider(config.options)

program
    .version('0.1.0')
    .command('send <deviceToken>')
    .description('Send single notification to a device')
    .action(function (deviceToken, command) {
        var note = new apn.Notification()
        note.expiry = Math.floor(Date.now() / 1000) + 3600 // Expires 1 hour from now.
        note.badge = 1
        note.sound = 'default'
        note.alert = ''
        note.topic = ''
        note.category = ''
        note.payload = {

        }
        log('\n')
        log(chalk.yellow.bold('Sending notification to device ...'))
        log('\n')
        apnProvider.send(note, deviceToken).then((result) => {
            log(chalk.blue.bold('APN Response:'))
            log('\n')
            log(chalk.bold(JSON.stringify(result)))
            log('\n')
            process.exit(1)
        })
    })
program.parse(process.argv)