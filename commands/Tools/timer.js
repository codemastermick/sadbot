// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
const { Command } = require('klasa');

/*
	To use this correctly, you will also need the reminder task located in
	/tasks/reminder.js
*/

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Sets a timer',
			usage: '<when:time>',
		});
	}

	async run(msg, [when, text]) {
		const reminder = await this.client.schedule.create('timer', when, {
			data: {
				channel: msg.channel.id,
				user: msg.author.id,
			}
		});
		return msg.sendMessage(`Your timer's ID is: \`${reminder.id}\``);
	}

};