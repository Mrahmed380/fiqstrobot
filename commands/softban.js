module.exports = {
  name: 'softban',
  description: 'Bans and then unbans the user to delete all of their previous messages.',
  category: 'moderation',
  usage: ' <user>',
  args: true,
  execute: async (client, message, args) => {
  let member = message.mentions.members.first();
  let reason = args.join(' ');
  if (member.displayName) {
    member.ban(reason)
    message.channel.send(`**${member.displayName}** was softbanned!`)
    message.guild.unban(member.id)
  } else {
    member.ban(reason)
    message.channel.send(`**${member.username}** was softbanned!`)
    message.guild.unban(member.id)
  }
    }
}