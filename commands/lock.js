module.exports = {
name: 'lock',
description: 'Disables members from chatting in the current channel.',
category: 'management',
execute: async (client, message, args) =>{
  let roles = message.guild.roles
  let everyone = roles.find('name', '@everyone');
  if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send(":x: | Sorry, you don't have the permission to use this command!")
    
  message.channel.overwritePermissions(everyone, {
 'SEND_MESSAGES': false 
  }).then(()=> {
  message.channel.send(":lock: | Sucsessfully locked channel.")
  })
  }
}