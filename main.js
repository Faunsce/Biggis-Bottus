require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${process.env.DISCORD_TOKEN}!`);
});

let code = '0000';

client.on('message', msg => {

  if (msg.channel.type == 'dm' && msg.author.id != 872689458166792203) {
    if( msg.author.id == 218919106504556545) {
      if (msg.content.startsWith('!set ')) {
        code = msg.content.substring(5);
        msg.reply('Code now set to : [' + code + ']');
      } else {
        msg.reply("Please set the code using `!set 0000`");
      }
    } else {
      msg.reply('Insufficient Permissions');
    }
  } else if (msg.author.id != 872689458166792203) {
    if (msg.member.roles.cache.find(role => role.name === "New Hazzy's") || msg.member.roles.cache.find(role => role.name === "That One Streamer")) {
      if (msg.content == '!raid') {
        msg.channel.send('@everyone')
        for (var i = 0; i < 4; i++) {
          msg.channel.send('LOCKER CODE : ' + code);
        }
      }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);