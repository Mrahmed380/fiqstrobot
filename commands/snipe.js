let Discord = require('discord.js');

module.exports = {
  name: "snipe",
  category: 'misc',
  description: 'Sends back the most recent deleted message in this channel',
  execute: async (client, message, args) => {
    
    let snipe = client.sniper.get(message.channel.id);
    
    
    if(snipe === undefined) {
      message.channel.send(":x: | There is Nothing to snipe")
    } else {
    
    
    let embed = new Discord.RichEmbed()
    .setDescription(snipe.message) //fuck me now try
    .setAuthor(snipe.author , snipe.avatar)
    .setTimestamp()
    .setColor(client.color)
    message.channel.send({embed : embed});
    // what did you do to stats nibba
    //this is snipe not stats wtf, i didnt do anyting nibba you did some shit that day
    
    client.sniper.delete(message.channel.id)};
    
  }
}
//useless k