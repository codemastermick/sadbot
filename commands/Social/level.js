const { Command } = require('klasa');
require('dotenv').config();
module.exports = class extends Command {

    constructor(...args) {
        super(...args, { description: 'Checks your current level.' });
    }

    run(message) {
        const cxp = message.author.settings.get('experience');
        const raw = Math.floor(cxp / 200);
        let lvl = null;
        switch (raw) {
            case 0:
                lvl = 'unranked'
                break;
            case 1:
                lvl = 'Wood rank'
                break;
            case 2:
                lvl = 'Bronze rank'
                break;
            case 3:
                lvl = 'Silver rank'
                break;
            case 4:
                lvl = 'Gold rank'
                break;
            case 5:
                lvl = 'Diamond rank'
                break;
            default:
                lvl = `BREAKING THINGS!!!! DM <@${process.env.author}> ASAP and tell him what you did right before you ran this command`
        }
        message.send(`You are currently ${lvl}.`);
    }

};