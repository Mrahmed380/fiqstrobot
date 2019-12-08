let db = require('quick.db')
let Discord = require('discord.js')

module.exports = {
  name: 'warncount',
  description: 'Shows the amount of warns that you/the user currently have.',
  usage: ' <user> (optional)',
  category: 'moderation',
  execute: async (client, message, args) => {
    let wa = new db.table('warns')
    let user = message.mentions.users.first() || message.author
    let warnings = wa.fetch(`warns_${user.id  + message.guild.id}`)
    message.channel.send(new Discord.RichEmbed()
                        .setColor(client.color)
                        .setAuthor(`${user.username}'s warnings'`, user.displayAvatarURL)
                        .setDescription('`' + warnings + '`'))
  }
}