const { Command } = require('klasa');

const pool = require('../../database');
const mysql = require('promise-mysql');


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
            description: 'Provides random words of inspiration.',
            extendedHelp: '',
            usage: '<num:number>',
            usageDelim: undefined,
            quotedStringSupport: false,
            subcommands: false
        });
    }

    async run(message, [num]) {
        // This is where you place the code you want to run for your command
        const selectQuery = `SELECT * FROM ?? ORDER BY RAND() LIMIT 0,${num}`;
        const query = mysql.format(selectQuery, ['random_words']);
        pool.query(query, async (err, response) => {
            if (err) throw err;
            const words = [];
            for (let i = 0; i < num; i++) {
                words.push(response[i].word.trim());
            }
            message.send(words);
        });
    }

    async init() {
        /*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
    }

};
