const moment = require('moment');
require('moment-duration-format');
let Discord = require('discord.js')
let db = require('quick.db')
module.exports = {
  name: 'crime',
  description: 'Do illegal stuff and earn money!',
  category: 'economy',
  execute: async (client, message, args) => {
    
     let time = 7.2e+6;
    let timeout = await db.fetch(`crimet_${message.author.id}`);
    let amount = Math.floor(Math.random() * 600) + 3000;
    
    if(timeout !== null && time - (Date.now() - timeout) > 0) {

      message.channel.send(":x: | You're exhausted! Please come back in **" + moment.duration(time - (Date.now() - timeout)).format("D [days], H [hrs], m [mins], s [secs]") + "**")
    
    } else {
    
     var output = await client.eco.Work(message.author.id, {
      money: Math.floor(Math.random() * 1000),
      jobs: ['robbed the bank', 'sold some drugs', 'stole a purse']
    })
   
    if (output.earned == 0) {
      let amount = Math.floor(Math.random() * 300)
      return client.eco.SubtractFromBalance(message.author.id, amount)
      return message.reply(`:x: | Oh no! The police caught you and you paid a fine of ${amount}${client.currencyEmote }!`)
   
    await db.set(`crimet_${message.author.id}` , Date.now())
    } else {
 await db.set(`crimet_${message.author.id}` , Date.now())
    message.channel.send(new Discord.RichEmbed()
                        .setTitle('Crime')
                        .setDescription(`You ${output.job} and earned ${output.earned}${client.currencyEmote}!`)
                        .setColor(client.color))
    }
  }}
  
}