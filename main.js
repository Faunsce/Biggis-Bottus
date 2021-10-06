require('dotenv').config();

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${process.env.DISCORD_TOKEN}!`);
});

let code;
fs.readFile('code.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  code = data;
  console.log(code);
})

let officers = '852066806599647233';
let officer_commands = new Map();

officer_commands.set('!set', function(msg){
  code = msg.content.substring(5);
  fs.writeFile('code.txt', code, err => {
    if (err) {
      console.error(err);
    }
    // File has been written to successfully
  })
  msg.reply('Code now set to : [' + code + ']');
});

officer_commands.set('!get', function(msg){
  msg.reply("The code is currently set to : [" + code + "]");
});


let hazzys = '821081071520317540';
let hazzy_commands = new Map();

hazzy_commands.set('!raid', function(msg){
  msg.channel.send('@everyone');
  for (var i = 0; i < 4; i++) {
    msg.channel.send('LOCKER CODE : ' + code);
  }
});

hazzy_commands.set('!flex', function(msg){
  let flexes = [
    '#HZGONTOP',
    'Cope harder kid, absolute baboon mentality. I will stay winning, you will stay losing #HZGONTOP',
    'MAKING..MY...WAY...THROUGH...THE...ROAMS...SIPPING..THIS..YAK...NIGGAS...BOUT...TO...GET...CLAPPED',
    'CALL….US….CURFEW…BECAUSE…..WE…..SENDING…. YOU…. BACK…TO…YOUR….BED',
    'RADIATION DETECTED \
    LOCATION: YOUR LOOTROOM \
    RESPONSE: HAZMATS DEPLOYED',
    'Sit...Down...And...Drink...Your...Sippy...Cups...Because...We\'re...Making...Children...Of...Men...#HZGONTOP',
    'Your.....Base.....Boutta.....Blow.....Up.....Like.....Chernobyl #HZGONTOP'
  ]
  msg.channel.send(flexes[Math.floor(Math.random() * flexes.length)]);
})

hazzy_commands.set('!cope', function(msg){
  msg.channel.send('Cope harder kid, absolute baboon mentality. I will stay winning, you will stay losing #HZGONTOP');
})

client.on('message', msg => {
  if (msg.content.startsWith('!')) {
    console.log("COMMAND REGISTERED: " + msg.content);
    let command ='';
    for (var i = 0; i < msg.content.length; i++) {
      if (msg.content[i] != ' ') {
        command += msg.content[i];
      } else {
        break;
      }
    }
    console.log("COMMAND IS " + command);
    if (msg.member.roles.cache.get(hazzys)) {
      console.log("has hazzys");
      if (hazzy_commands.has(command)) {
        console.log("command exists");
        hazzy_commands.get(command)(msg);
        return;
      } else if (msg.member.roles.cache.get(officers)) {
        console.log("has officer");
        if (officer_commands.has(command)) {
          officer_commands.get(command)(msg);
          return;
        }
      }
    }
    msg.reply('Either this command does not exist or you have insufficient permissions!');
  } 
});