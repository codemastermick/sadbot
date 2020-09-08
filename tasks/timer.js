const { Task } = require('klasa');
const { Channel } = require('discord.js');

module.exports = class extends Task {

    async run({ channel, user, text }) {
        const _channel = this.client.channels.cache.get(channel);
        if (_channel) await _channel.send(`Time is up <@${user}>!`);
    }

};