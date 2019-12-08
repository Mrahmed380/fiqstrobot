module.exports = {
  name: 'unlock',
  description: 'Allows members to chat in a locked channel.',
  category: 'management',
  execute: async (client, message, args) => {
      let roles = message.guild.roles
  let everyone = roles.find('name', '@everyone');
  if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(":x: | Sorry, you don't have the permission to use this command!")
    
  message.channel.overwritePermissions(everyone, {
 'SEND_MESSAGES': true
  }).then(()=> {
  message.channel.send(":unlock: | Sucsessfully unlocked channel.")
  })
  }
}