module.exports = {
name: 'deleteemoji',
description: 'Deletes an emoji in a guild',
usgae: ' <emoji>',
category: 'management',
args: true,
execute: async (client, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(':x: | Sorry, you don\'t have the permission to user this commnad')
  let emoji = client.emojis.find(e => e.name === args[0])
message.guild.deleteEmoji(emoji).then(() => {
message.channel.send(`Deleted emoji \`${args[0]}\``)
})
  }
}