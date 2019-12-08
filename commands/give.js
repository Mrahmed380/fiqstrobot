module.exports = {
  name: 'give',
  description: 'Gives a user an amount of money.',
  usage: ' <user> <amount>',
  args: true,
  category: 'economy',
  execute: async (client, message, args) => {
    var user = message.mentions.users.first()
    var amount = args[1]

    if (!amount) return message.reply(':x: | Specify the amount you want to pay!')
 
    var output = await client.eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply(':x: | You have fewer coins than the amount you want to transfer!')
 
    var transfer = await client.eco.Transfer(message.author.id, user.id, amount)
    message.channel.send(`You sucsessfully gave ${user.username} ${amount}${client.currencyEmote}`)
  }
}