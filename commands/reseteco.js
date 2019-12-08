module.exports = {
  name: 'reseteco',
  description: 'Resets the economy system. (DEV ONLY)',
  category: 'economy',
  args: true,
  execute: async (client, message, args) => {
    if(message.author.id !== "400845681574674442" && message.author.id !== "544922024301297691") return message.channel.send("This is a dev-only command.")
    let user = message.mentions.users.first() || client.users.get(args[0]);
    client.money.set(`money_${user.id}`, 0)
      message.channel.send(`${user.username}'s balance is now \`0\``)
    
  }
}