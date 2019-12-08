let Discord = require('discord.js')

module.exports = {
name: 'unban',
description: 'Unbans a user using ID.',
usage: ' <user-id>',
args: true, 
category: 'moderation',
execute: async (client, message, args) => {
  
  if(!message.member.hasPermission("BAN_MEMBERS") && message.author.id !== "291221132256870400") return message.channel.send("Sorry you don't have permission to use this!");
  message.guild.unban(args[0])
  .then(user => {
    message.channel.send(`Unbanned \`${user.username}\``)
  })
  }
}