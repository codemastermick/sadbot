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
            aliases: ["requeue"],
            autoAliases: true,
            bucket: 1,
            cooldown: 0,
            promptLimit: 0,
            promptTime: 30000,
            deletable: false,
            guarded: false,
            nsfw: false,
            permissionLevel: 0,
            description: 'Pass your collab turn for now, allowing yourself to be chosen again later.',
            extendedHelp: '',
            usage: '',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [...params]) {
        // This is where you place the code you want to run for your command
        if((await this.client.users.fetch(message.author.id)).settings.get("collab_skipped")){
            (await this.client.users.fetch(message.author.id)).settings.update("experience", points - 1);
            (await this.client.users.fetch(message.author.id)).settings.update("collab_done", true);
        }

        const collaborators = [];
        this.client.users.cache.forEach(user => {
            if ((user.settings.collab === true && user.settings.collab_done === false && user.settings.collab_skipped===false) && (user.settings.id !== message.author.id)) {
                collaborators.push(user);
            }
        });
        if (collaborators.length == 0) {
            this.client.users.cache.forEach(lateUser => {
                if ((lateUser.settings.collab === true && lateUser.settings.collab_done === false && lateUser.settings.collab_skipped===true) && (lateUser.settings.id !== message.author.id)) {
                    collaborators.push(lateUser);
                }
            });
            message.send('There does not seem to be anyone left to go. Good work everyone!');
        }
        (await this.client.users.fetch(message.author.id)).settings.update("collab_skipped", true);

        const random = collaborators[~~(Math.random() * collaborators.length)];
        message.send(`That's alright, <@${random.id}> how about you?`);
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
