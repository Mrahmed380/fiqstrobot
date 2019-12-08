const Discord = require('discord.js')

module.exports = {
  name: 'avatar',
  description: 'Shows the user\'s avatar.',
  usage: " <user> (optional)",
  category: 'misc',
  execute(client, message, args) {
    let user = message.mentions.users.first() || message.author;
    message.channel.send(new Discord.RichEmbed()
                        .setTitle(`${user.username}'s avatar`)
                        .setImage(user.displayAvatarURL)
                         .setColor(client.color)
                        )
  }
}