// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
const { Command } = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['choose', 'decide'],
			description: 'Makes a decision for you given some choices.',
			usage: '<choices:str> [...]',
			usageDelim: '|'
		});
	}

	run(msg, choices) {
		return msg.reply(choices.length === 1 ?
			`Since you only gave me one choice, let's pick ${choices[0]}.` :
			`I think you should go with "${choices[Math.floor(Math.random() * choices.length)]}"`);
	}

};