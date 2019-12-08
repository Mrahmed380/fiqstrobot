module.exports = {
  name: 'createrole',
  description: 'Creates a role in a server',
  category: 'management',
  usage: '<name> <color>',
  execute: async (client, message, args) => {
    if(!args[0]) return message.channel.send(':x: | Please enter a name for the role!')
    if(!args[1]) args[1] = '99aab5'
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(":x: | Sorry, you don't have the permission to use this command!")
    message.guild.createRole({
    name: args[0],
    color: args[1]
    }).then(r => {
    message.channel.send(`Sucsessfully created the \`${r.name}\` role!`)
    })
  }
}