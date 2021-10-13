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

let officers = '897190590855397411';
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


let members = '897190590855397409';
let member_commands = new Map();

member_commands.set('!raid', function(msg){
  msg.channel.send('@everyone , @' + msg.author.tag + ' has sounded the alarm!');
  for (var i = 0; i < 4; i++) {
    msg.channel.send('LOCKER CODE : ' + code);
  }
});

member_commands.set('!flex', function(msg){
  let flexes = [
    '',
    'Cope harder kid, absolute baboon mentality. I will stay winning, you will stay losing ',
    'MAKING..MY...WAY...THROUGH...THE...ROAMS...SIPPING..THIS..YAK...NIGGAS...BOUT...TO...GET...CLAPPED',
    'CALL….US….CURFEW…BECAUSE…..WE…..SENDING…. YOU…. BACK…TO…YOUR….BED',
    'RADIATION DETECTED \
    LOCATION: YOUR LOOTROOM \
    RESPONSE: HAZMATS DEPLOYED',
    'Sit...Down...And...Drink...Your...Sippy...Cups...Because...We\'re...Making...Children...Of...Men...',
    'Your.....Base.....Boutta.....Blow.....Up.....Like.....Chernobyl'
  ]
  msg.channel.send(flexes[Math.floor(Math.random() * flexes.length)] + '#LONGLIVETHEMPIRE');
})

member_commands.set('!kukke', function(msg){
  msg.channel.send('Oh, did you mean NN?');
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
    if (msg.author.id == '218919106504556545' || msg.member.roles.cache.get(members)) {
      console.log("has membership");
      if (member_commands.has(command)) {
        console.log("command exists");
        member_commands.get(command)(msg);
        return;
      } else if (msg.author.id == '218919106504556545' || msg.member.roles.cache.get(officers)) {
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
