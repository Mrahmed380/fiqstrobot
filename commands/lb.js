let db = require('quick.db');
let Discord = require('discord.js');

//fuckllkkkkkk
module.exports = {
  name: "lb",
  description: 'Shows the economy leaderboard.',
  category: 'economy',
  usage: ' <xp/eco>',
  execute: async (client, message, args) => {
    if(!args.length) return message.channel.send(`:x: | Please do "${client.prefix}help lb"`)
  if(args[0] === 'eco') {
client.eco.Leaderboard({
        limit: 10,
        filter: x => x.balance > 1 
      }).then(async users => { 
    var finalLb = "";
    var i = 0;
    let indexnum = 0;
    for (i in users) {
      finalLb += `**${++indexnum}. ${await client.fetchUser(users[i].userid)}** - ${users[i].balance}${client.currencyEmote}\n`;
    }
 
        message.channel.send(new Discord.RichEmbed()
                            .setTitle("Leaderboard")
                            .setDescription(finalLb
                            )
                            .setColor("BLURPLE"))
  
    })}
    else if(args[0] === 'xp') {
 
      client.leveling.Leaderboard({
        limit: 10
      }).then(async users => { 
 
       var finalLb = "";
    var i = 0;
    let indexnum = 0;
    for (i in users) {
      finalLb += `**${++indexnum}. ${await client.fetchUser(users[i].userid)}** - Level **${users[i].level}**\n`;
    }
 
        message.channel.send(new Discord.RichEmbed()
                            .setTitle("Leaderboard")
                            .setDescription(finalLb
                            )
                            .setColor("BLURPLE"))
 
      })
        }
  } 
    
  }

  
  
  
  
  //use this emoji <:coin2:647720769429700609> as the coin or money
//k im on mobile so copy paste is hard //lemme go run my music bot and brb it runs only on my pc