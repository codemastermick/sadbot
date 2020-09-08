const { Task, KlasaUser } = require('klasa');

module.exports = class extends Task {

    constructor(...args) {
        /**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
        super(...args, { enabled: true });
    }

    async run(data) {
        // This is where you place the code you want to run for your task
        this.client.guilds.cache.forEach(guild => {
            guild.systemChannel.send('Running nightly reset...');
        });
        this.client.users.cache.forEach(async user => {
            await user.settings.update([['points_today', 0]]);
        });
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
       

        // await this.client.schedule.create('nightly_reset', '0 0 * * *', { catchUp: true });
        // await this.client.schedule.delete('dailyreset');
    }

};
