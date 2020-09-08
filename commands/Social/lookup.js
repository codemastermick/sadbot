// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
const { Command } = require('klasa');
const Discord = require('discord.js')
require('dotenv').config();
const pool = require('../../database');
const mysql = require('promise-mysql');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: "Looks up another user's profile card",
            usage: '<target:username>',
        });
    }

    async run(msg,[target]) {
        const points = (await this.client.users.fetch(target.id)).settings.get("experience");
        const raw = Math.floor(points / 200);
        let lvl = null;
        switch (raw) {
            case 0:
                lvl = 'Unranked'
                break;
            case 1:
                lvl = 'Wood'
                break;
            case 2:
                lvl = 'Bronze'
                break;
            case 3:
                lvl = 'Silver'
                break;
            case 4:
                lvl = 'Gold'
                break;
            case 5:
                lvl = 'Diamond'
                break;
            default:
                lvl = `BREAKING THINGS!!!! DM <@${process.env.author}> ASAP and tell him what you did right before you ran this command`
        }
        const collab = (await this.client.users.fetch(target.id)).settings.get("collab");
        const admin = (await this.client.users.fetch(target.id)).settings.get("admin");

        pool.query('SELECT * FROM users ORDER BY experience DESC', async (err, result) => {
            if (err) throw new Error(err);
            // msg.channel.lastMessage.delete();
            if (result.length === 0) {
                msg.channel.send('There does not seem to be enough users?');
            }
            else {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].id == target.id) {
                        const embed = new Discord.MessageEmbed();
                        embed.setTitle(`Rank #${i+1}`);
                        embed.setDescription(`${lvl} - ${points}xp`);
                        embed.setAuthor(target.username);
                        embed.setThumbnail(target.displayAvatarURL());
                        embed.addField("Admin", admin ? "Yes" : "No", true);
                        embed.addField("Collab", collab ? "Yes" : "No", true);
                        return msg.sendEmbed(embed);
                    }
                }
            }
        });


    }

};