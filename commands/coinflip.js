module.exports = {
  name: 'coinflip',
  description: 'Flip the coin and earn money!',
  category: 'economy',
  args: true,
  usage: ' <heads/tails> <amount>',
  execute: async (client, message, args) =>{
     var flip = args[0] 
    var amount = args[1] 
 
    var output = await client.eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.channel.send(':x: | You have fewer coins than the amount you want to gamble!')
 
    var gamble = await client.eco.Coinflip(message.author.id, flip, amount).catch(console.error)
    message.channel.send(`You ${gamble.output}! New balance: ${gamble.newbalance}`)
  }
}