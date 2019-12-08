const Discord = require('discord.js')

module.exports = {
  name: 'userinfo',
  description: 'Shows the current info of the user.',
  usage: ' <user> (optional)',
  category: 'misc',
  execute(client, message, args) {
    let user = message.mentions.members.first() || message.author;
    let game = user.presence.game;
    if (game === null) game = "none"
    
    message.channel.send(new Discord.RichEmbed()
                        .setAuthor(`${user.username}'s status`)
                        .setThumbnail(user.displayAvatarURL)
                        .setColor(client.color)
                        .addField("ID", user.id)
                        .addField("Game Playing", game)
                        .addField("Status", user.presence.status)
                        
                        )
  }
}