module.exports = {
  name: 'dice',
  description: 'Play with the dice and earn money!',
  category: 'economy',
  usage: ' <number> <amount>',
  execute: async (client, message, args) =>{
    var roll = args[0] 
    var amount = args[1] 
 
    if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.channel.send(':x: | Specify the roll, it should be a number between 1-6')
    if (!amount) return message.channel.send(':x: | Specify the amount you want to gamble!')
 
    var output = client.eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply(':x: | You have fewer coins than the amount you want to gamble!')
 
    var gamble = await client.eco.Dice(message.author.id, roll, amount).catch(console.error)
    message.reply(`The dice rolled ${gamble.dice}. So you ${gamble.output}! New balance: ${gamble.newbalance}`)
 
  }
}