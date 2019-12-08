module.exports = {
  name: 'nameserver',
  description: 'Changes the server\'s name.',
  usage: ' <name>',
  category: 'management',
  args: true,
  execute: async (client, message, args) => {
     if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(":x: | Sorry, you don't have the permission to use this command!")
    
    message.guild.setName(args.join(' '))
 .then(g => message.channel.send(`Updated server name to \`${g}!\``))
 .catch(console.error);
  }
}