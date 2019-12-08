const Discord = require('discord.js')

module.exports = {
  name: '8ball',
  description: 'Gives an answer to your question',
  usage: ' <question>',
  category: 'fun',
  execute (client, message, args) {
    if(!args[1]) return message.reply(":x: | Plesae enter a full question with 2 or more words!");
    let replies = ["Yes", "No", "I don't know", "Ask again later!", "Cyka", "I am not sure!", "Pls No", "You tell me", "Without a doubt", "Cannot predict now", "Without a doubt", ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.join(" ");

    let ballembed = new Discord.RichEmbed()

    .setAuthor(message.author.username)
    .setColor(client.color)
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed)
  }
};
