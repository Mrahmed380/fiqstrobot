let Discord = require('discord.js')
let db = require('quick.db')
module.exports = {
name: 'warn',
description: 'Warns a user because of an offense.',
category: 'Moderation',
usage: ' <user> <reason>',
execute: async (client, message, args) => {
  let wa = new db.table('warns')
  let reason = args.slice(1).join(' ')
  let member = message.mentions.members.first()
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(':x: | Sorry, you cannot use this command!')
  if(!member) {
    return message.channel.send(':x: | Please mention a user!')
  } else if (!reason) {
    reason = 'No reason provided.'
  } else {
    let warns = wa.fetch(`warns_${member.id + message.guild.id}`)
    if(warns === null) warns = 0
    wa.add(`warns_${member.id + message.guild.id}`, 1)
    member.send(new Discord.RichEmbed()
               .setTitle(`You were warned`)
               .setColor("BLURPLE")
                .setThumbnail(message.guild.iconURL)
               .addField('Server', message.guild.name)
               .addField('Reason', reason)
               .addField('Warn Count', warns))
  }
  
  }
}