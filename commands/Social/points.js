const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, { description: 'Checks how many points you have.' });
    }

    run(message) {
        return message.send(`You have a total of ${message.author.settings.experience} experience points!`);
    }

};