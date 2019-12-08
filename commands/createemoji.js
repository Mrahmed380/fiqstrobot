module.exports = {
  name: 'createemoji',
  description: 'Creates an emoji for the server.',
  usage: '<image-url> <emote-name>',
  category: 'management',
  execute: async (client, message, args) => {
    if(!args[0]) return message.channel.send(':x: | Please give me a valid image url!')
    if(!args[1]) return message.channel.send(':x: | Please give me a name for the emoji!')
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(":x: | Sorry, you don't have the permission to use this command!")
    
    message.guild.createEmoji(args[0], args[1])
  .then(e => {
      message.channel.send(`Created emoji \`${e.name}\` (${client.emojis.find(emoji => emoji.name === args[1])})`)
    }).catch(e => {
      message.channel.send(":x: | Can't create Emoji Without URL!")
    })
  }
}