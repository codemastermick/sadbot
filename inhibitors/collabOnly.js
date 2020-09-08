const { Inhibitor } = require('klasa');
const channelID = '709525329634394122';
const channelName = 'Collab'

module.exports = class extends Inhibitor {
    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            spamProtection: true
        });
    }

    async run(message, command) {
        // This is where you place the code you want to run for your inhibitor
        if (message.channel.id !== channelID && command.category === channelName) {
            throw message.send(`${message.author} it looks like you are trying to use a command from <#${channelID}>. Please try again from the right channel.`);
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
