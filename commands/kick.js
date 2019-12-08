const Discord = require('discord.js')

module.exports = {
  name: 'kick',
  description: 'kicks a user.',
  usage: ' <user>',
  category: 'moderation',
  args: true,
  execute: async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")  && message.author.id !== "291221132256870400") return message.channel.send(":x: | Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first()
    
    if(!member.kickable) 
      return message.channel.send(":x: | I cannot kick this user!");
    
    let reason = args.slice(1).join(' ');
    if(!reason) {
      reason = "No reason given";
    }
    
    await member.kick(reason)
      .catch(error => message.channel.send(`:x: | Sorry, I couldn't kick because of : ${error}`));

      let kick = new Discord.RichEmbed()
      .setColor(client.color)
      .setTitle(`Kick | ${member.user.tag}`)
      .addField("User", member, true)
      .addField("Moderator", message.author, true)
      .addField("Reason", reason)
      .setTimestamp()
      .setFooter(member.id)

      message.channel.send(kick)

    
  }
}