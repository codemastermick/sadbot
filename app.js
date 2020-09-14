// https://discord.com/api/oauth2/authorize?client_id=744614090219061318&permissions=8&scope=bot

const { Client } = require('klasa');
require('dotenv').config();
const { generalChannel, rulesChannel } = require('./config.json');

new Client({
    fetchAllMembers: false,
    prefix: '!',
    commandEditing: true,
    owners: [process.env.author],
    presence: { activity: { name: 'over the server', type: 'WATCHING' } },
    providers: { default: "mysql" },
    readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.cache.size} guilds.`
}).on("guildMemberAdd",member=>{
    member.guild.systemChannel.send(`Welcome to the server ${member}! After reading <#${rulesChannel}>, come say hello in <#${generalChannel}>. We are happy you joined us.`);
	// const memberRole = member.guild.roles.cache.find(role => role.name === 'Member');
    member.roles.add('616023976552038413');
}).login(process.env.token);

Client.defaultUserSchema.add('experience', 'Integer', {
    default: 0,
    configurable: false
});
Client.defaultUserSchema.add('points_today', 'Integer', {
    default: 0,
    configurable: false
});
Client.defaultUserSchema.add('citations', 'Integer', {
    default: 0,
    configurable: false
});
Client.defaultUserSchema.add('collab', 'Boolean', {
    default: false,
    configurable: false
});
Client.defaultUserSchema.add('collab_done', 'Boolean', {
    default: false,
    configurable: false
});
Client.defaultUserSchema.add('collab_skipped', 'Boolean', {
    default: false,
    configurable: false
});
Client.defaultUserSchema.add('passes', 'Integer', {
    default: 0,
    configurable: false
});
Client.defaultUserSchema.add('admin', 'Boolean', {
    default: false,
    configurable: false
});