const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, {
            enabled: true,
            runIn: ['text', 'group'],
            requiredPermissions: [],
            requiredSettings: [],
            aliases: [],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Schedules the daily reset task if it is not scheduled.',
            extendedHelp: '',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        // This is where you place the code you want to run for your command
        if (this.client.schedule.get('dailyreset')) {
            message.send('There is already a reset task scheduled!');
            return;
        } else {
            await this.client.schedule.create('nightly_reset', '0 0 * * *', { id: 'dailyreset', catchUp: true }).then(async task => {
                console.log(`Scheduled ${task.taskName} as ${task.id} at ${task.time}`);
                message.send(`Scheduled ${task.taskName} as ${task.id} at ${task.time}`);
            })
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */

        if (this.client.schedule.get('dailyreset')) {
            this.client.console.log('we already have a reset task scheduled!');
            await this.client.schedule.delete('dailyreset').then(async schedule => {
                await this.client.schedule.create('nightly_reset', '0 0 * * *', { id: 'dailyreset', catchUp: true }).then(async task => {
                    console.log(`Rescheduled ${task.taskName} as ${task.id} at ${task.time}`);
                })
            })
        }
    }

};
