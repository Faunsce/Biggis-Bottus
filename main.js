require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${process.env.DISCORD_TOKEN}!`);
});

client.on('message', msg => {
  if (msg.content.charAt(0) != ("~")) return;
  
  msg.content = msg.content.slice(1);
  
  if (msg.content === "pang") {
    msg.reply('bang');
  }
});

client.login(process.env.DISCORD_TOKEN);