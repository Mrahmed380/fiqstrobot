const puppy = require('random-puppy')
let Discord = require('discord.js')
module.exports = {
  name: 'ass',
  description: 'Gives a picture of an ass for you.',
  category: 'nsfw',
  execute: async (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send(":x: | You need to be in an NSFW channel to use this command.")
 
    let keywords = [
    "ass",
    "butt",
    "asshole",
    "pussy",
    "butthole"
  ]
  
  var result = keywords[Math.floor(Math.random()*keywords.length)]
  
  puppy(result).then(url => {
    let embed = new Discord.RichEmbed()
    .setTitle("Ass")
    .setImage(url)
    .setTimestamp()
    .setFooter(`Requested by ${message.author.username}`)
    message.channel.send({embed: embed})
  })
  }
}