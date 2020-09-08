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
            description: 'Unregisters you as a collaboration player.',
            extendedHelp: '',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        // This is where you place the code you want to run for your command
        (await this.client.users.fetch(message.author.id)).settings.update("collab", false);
        (await this.client.users.fetch(message.author.id)).settings.update("collab_done", false);
        message.author.roles.remove('709528250606551081');
        message.send(`I've taken care of it ${message.author}. You are no longer registered as a collaborator.`);
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
