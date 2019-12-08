let discord = require('discord.js')
const search = require('random-puppy')
module.exports = {
  name: 'dick',
  description: 'Shows a picture of a dick for you.',
  category: 'nsfw',
  execute: async (client, message, args) => {
let em = new discord.RichEmbed()
  .setTitle("Dick")
  .setTimestamp()
  .setFooter(`Requested by ${message.author.username}`)
  let keys = [
    "penis",
    "dick",
    "cock",
    "dong", 
    "plonker"
  ]
  
  if (!message.channel.nsfw) return message.channel.send(":x: | You need to be in an NSFW channel to use this command.");
  let result = keys[Math.floor(Math.random()*keys.length)]
  
  search(result).then(url => {
    em.setImage(url)
    message.channel.send({embed: em})
  })
  }
}