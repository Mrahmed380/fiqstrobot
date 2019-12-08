let db = require("quick.db");
let Discord = require("discord.js");

module.exports = {
  name: "bal",
  description: "Shows your current balance.",
  usage: "<user> (optional)",
  category: "economy",
  execute: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
    var output = await client.eco.FetchBalance(user.id)
    var outputrank = await client.eco.Leaderboard({
        filter: x => x.balance > 50,
        search: user.id
      })
    message.channel.send(new Discord.RichEmbed()
                        .setTitle(`${user.username}'s Balance`)
                        .setDescription(`${output.balance}${client.currencyEmote}`)
                        .setFooter(`Rank: ${outputrank}`)
                        .setColor('BLURPLE')
                        );
  }
};
