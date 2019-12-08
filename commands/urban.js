const Discord = require('discord.js')
const urban = require('urban')
module.exports = {
  name: 'urban',
  description: 'Searches up definitions from urban dictionary.',
  usage: ' <word>',
  category: 'nsfw',
  execute(client, message, args) {
 if (!message.channel.nsfw) return message.channel.send(":x: | You need to be in an NSFW channel to use this command.")
    if(args.length < 1) return message.reply(":x: | Please enter something!");
    let XD = args.join(" "); 

    urban(XD).first(json => {
        if(!json) return message.reply(":x: | No results found!")

        let urbEmbed = new Discord.RichEmbed()
        .setColor(client.color)
        .setTitle(json.word)
        .setDescription(json.definition)
        .addField("Upvotes", json.thumbs_up, true)
        .addField("Downvotes", json.thumbs_down, true)
        .setFooter(`Written by: ${json.author}`);

        message.channel.send(urbEmbed)
    });
  
  }
}