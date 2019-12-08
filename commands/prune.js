module.exports = {
  name: 'prune',
  description: 'kicks members that haven\'t been active for 30 days.',
  category: 'moderation',
  execute: async (client, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")  && message.author.id !== "291221132256870400") return message.channel.send(":x: | Sorry, you don't have permissions to use this!");
    
    message.guild.pruneMembers(30).then(p => {
      message.channel.send(`Pruned \`${p}\` members.`)
    })
  }
}