const Discord = require('discord.js')

module.exports = {
  name: 'ban',
  description: 'Bans a user.',
  usage: ' <user> <reason>',
  category: 'moderation',
  execute: async (client, message, args) => {
    let xdemb = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle("Ban Command")
        .addField("Description:", `Ban a member`, true)
        .addField("Usage:", `!ban [user] [reason]`, true)
        .addField("Example:", `!ban @fiqstro spam`)

        if(!message.member.hasPermission("BAN_MEMBERS") && message.author.id !== "291221132256870400") return message.channel.send("Sorry you don't have permission to use this!");

        let member = message.mentions.members.first();
        if(!member) return message.channel.send(':x: | Please mention a user!')
        if(!member.bannable) return message.channel.send(":x: | I can't ban this user!")
        if(member.user.id === "291221132256870400") return message.channel.send(":x: | I can't ban my owner!")

        if(member.id === message.author.id) return message.channel.send(":x: | You can't ban yourself")

        let reason = args.slice(1).join(" ");

        if(!reason) {
            reason = "No reason given";
        } 

        await member.ban(reason).catch(error => message.channel.send(`Sorry, I coldn't ban because of: ${error}`));

        let bean = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(`Ban | ${member.user.tag}`)
        .setThumbnail(member.displayAvatarURL)
        .addField("User", member, true)
        .addField("Moderator", message.author, true)
        .addField("Reason", reason)
        .setTimestamp()

        message.channel.send(bean)

        message.delete()
  }
}