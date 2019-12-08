let Discord = require('discord.js');
let db = require("quick.db");
let moment = require('moment');
require('moment-duration-format');



module.exports = { 
  name: "daily",
  description: "gives daily coins",
  usage: "daily",
  category: 'economy',
  execute: async (client, message, args) => {
    
    var output = await client.eco.Daily(message.author.id)
 let amount = Math.floor(Math.random() * 500) + 1
    if (output.updated) {
 
      var profile = await client.eco.AddToBalance(message.author.id, amount)
      message.channel.send(new Discord.RichEmbed()
                   .setTitle("Daily")
                   .setDescription(`You collected your daily reward, and earned ${amount}${client.currencyEmote}`)
                   .setColor(client.color));
 
    } else {
      message.channel.send(`Sorry, you already claimed your daily coins!\nBut no worries, over **${output.timetowait}** you can daily again!`)
    }
        
  
  }
};

