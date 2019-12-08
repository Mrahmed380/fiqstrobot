module.exports = {
name: 'hackban',
description: 'Bans a user using ID.',
usage: " <id>",
category: 'moderation',
execute: async (client, message, args) => {
    let mid = args.join(' ');
  if (!message.member.hasPermission(["BAN_MEMBERS"], false, true, true)) return message.channel.send(":x: | You don't have permission to use this command.");
    client.fetchUser(mid).then(id => {
      message.guild.ban(id).catch(err => {
        message.channel.send(":x: | Failed to ban user " + id)
        console.log(err)
      })
      message.channel.send(`**${id}** was banned!.`)
    }).catch(() => {
      message.channel.send(`:x: | There's no user with the ID of ${mid}, please try again.`)
    })
  }
}