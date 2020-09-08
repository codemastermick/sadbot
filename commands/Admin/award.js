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
            description: 'Awards the given amount of experience to the passed user.',
            extendedHelp: '',
            usage: '<target:username> <num:number>',
            usageDelim: ',',
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [target,num]) {
        // This is where you place the code you want to run for your command
        const points=(await this.client.users.fetch(target.id)).settings.get("experience");
        if(points<1000){
            (await this.client.users.fetch(target.id)).settings.update("experience",Math.min(points+num,1000));
            message.send(`${target.username} now has ${Math.min(points+num,1000)} xp.`);
        }else{
            message.send(`${target.username} already has 1000 xp.`);
        }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
