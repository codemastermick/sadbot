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
            description: 'Starts a new round of collaborative art.',
            extendedHelp: '',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        // This is where you place the code you want to run for your command
        this.client.guilds.cache.first().members.cache.forEach(async member => {
            (await this.client.users.fetch(member.id)).settings.update("collab_done", false);
            (await this.client.users.fetch(member.id)).settings.update("collab_skipped", false);
        });
        (await this.client.users.fetch(message.author.id)).settings.update("collab_done", true);
        const collaborators = [];
        this.client.users.cache.forEach(user => {
            if ((user.settings.collab === true && user.settings.collab_done === false) && (user.settings.id !== message.author.id)) {
                collaborators.push(user);
            }
        });
        if (collaborators.length == 0) {
            message.send('There does not seem to be anyone left to go. Good work everyone!');
        }
        const random = collaborators[~~(Math.random() * collaborators.length)];
        message.send(`<@${random.id}>, you're up first!`);
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
