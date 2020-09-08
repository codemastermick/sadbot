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
            description: 'Removes admin rights from the given user.',
            extendedHelp: '',
            usage: '<target:username>',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [target]) {
        // This is where you place the code you want to run for your command
        const admin=(await this.client.users.fetch(target.id)).settings.get("admin");
        if(admin){
            (await this.client.users.fetch(target.id)).settings.update("admin",false);
            message.send(`${target.username} no longer has admin rights.`);
        }else{
            message.send(`${target.username} wasn't an admin.`);
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
