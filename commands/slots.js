let Discord = require('discord.js')
module.exports = {
  name: 'slots',
  description: 'Play the slots and win money!',
  usage: ' <bet-amount>',
  category: 'economy',
  execute: async (client, message, args) => {
 
    var amount = args[0] 
 
    if (!amount) return message.channel.send(':x: | Specify the amount you want to gamble!')
 
    var output = await client.eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.channel.send(':x: | You have fewer coins than the amount you want to gamble!')
 
    var gamble = await client.eco.Slots(message.author.id, amount, {
      width: 1,
      height: 3,
      emojis: ['🍏', '🍐', '🍋', '🍌', '🍇', '🍊', '💎']
    }).catch(console.error)
    message.channel.send(new Discord.RichEmbed()
                        .setTitle("Slot Machine")
                        .setDescription(gamble.grid + `\nYou ${gamble.output} ${amount}${client.currencyEmote}!`)
                        .setColor(client.color))
                        
 
  }
}