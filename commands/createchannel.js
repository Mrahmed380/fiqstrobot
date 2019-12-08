module.exports = {
  name: 'createchannel',
  description: 'Creates a channel in the server.',
  category: 'management',
  usage: ' <channel>',
  args: true,
  execute: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(":x: | Sorry, you don't have the permission to use this command!")
    
    message.guild.createChannel(args[0], {type:'text'}).then(c => {
      message.channel.send(`Created channel \`#${c.name}\``)
    })
  }
}