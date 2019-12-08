
const Discord = require('discord.js');
const db = require("quick.db");
const moment = require('moment');
require('moment-duration-format');
module.exports = {
  name: 'work',
  category: 'economy',
  description: 'Work and earn money!',
  execute: async (client, message, args) => {
 let time = 900000;
    let timeout = await db.fetch(`workt_${message.author.id}`);
    let amount = Math.floor(Math.random() * 600) + 3000;
    
    if(timeout !== null && time - (Date.now() - timeout) > 0) {

      message.channel.send(":x: | You can't work now! Please come back in **" + moment.duration(time - (Date.now() - timeout)).format("D [days], H [hrs], m [mins], s [secs]") + "**")
    
    } else {
    await db.set(`workt_${message.author.id}` , Date.now())
    var output = await client.eco.Work(message.author.id, {
      failurerate: 10,
      money: Math.floor(Math.random() * 500),
      jobs: ['cashier', 'shopkeeper', 'slave']
    })
   
    if (output.earned == 0) return message.reply(':x: | You failed to do your job well so you earned nothing!')
 
    message.channel.send(new Discord.RichEmbed()
                        .setTitle("Work")
                        .setDescription(`${message.author.username}, You worked as a **${output.job}** and earned ${client.currencyEmote} ${output.earned}`))
                        .setColor("BLURPLE")
 
    }
  }
};