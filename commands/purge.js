module.exports = {
  name: 'purge',
  description: 'Deletes a certain amount of messages',
  usage: ' <amount>',
  category: 'moderation',
  args: true,
  execute: async (client, message, args) => {
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":x: | Sorry, you don't have the permission to use this command!")

      message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`Purged \`${args[0]}\` messages.`).then(msg => msg.delete(2000));
});
    
}};