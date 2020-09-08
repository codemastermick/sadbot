const { Monitor } = require('klasa');

const awardedChannels = [
    '616018289898029068',
    '696099696938188920',
    '709525329634394122',
    '616019071846318113',
    '618175228908142592',
    '616019146660118538',
    '617360934884605961',
    '698560541827924049'
]

module.exports = class extends Monitor {

    constructor(...args) {
        super(...args, {
            name: 'xp',
            enabled: true,
            ignoreBots: true,
            ignoreSelf: true,
            ignoreOthers: false,
            ignoreWebhooks: true,
            ignoreEdits: true,
            ignoreBlacklistedUsers: true,
            ignoreBlacklistedGuilds: true
        });
    }

    async run(message) {
        // If the message was not sent in a TextChannel, ignore it.
        if (!message.guild) return;
        // If the message was a command, ignore it
        if (message.commandText) return;

        if (awardedChannels.indexOf(message.channel.id)===-1)return;

        // Calculate the next value for experience. This is where we need to check the channel, content, etc
        const nextValue = message.author.settings.get('experience') + 1;
        const points_today = message.author.settings.get('points_today') + 1;

        if(points_today>=25)return;

        // Cache the current level.
        // const currentLevel = message.author.settings.get('level');

        // Calculate the next level.
        // const nextLevel = Math.floor(0.1 * Math.sqrt(nextValue + 1));

        // Update the user's configuration entry by adding 1 to it, and update the level also.
        await message.author.settings.update([['experience', nextValue]]);
        await message.author.settings.update([['points_today', points_today]]);
        // await message.author.settings.update([['experience', nextValue], ['level', nextLevel]]);

        // If the current level and the next level are not the same, then it has increased, and you can send the message.
        // if (nextValue !== nextLevel) {
        //     // Send the message to the channel congratulating the user.
        //     await message.send(`Congratulations! You leveled up to level **${currentLevel}**!`);
        // }
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
