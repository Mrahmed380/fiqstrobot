let Discord = require('discord.js')

module.exports = {
  name: 'volume',
  description: 'Shows/changes the current volume of the song playing',
  category: 'music',
  usage: ' <amount> (optional)',
  execute: async (client, message, args) => {
    let queue = client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(':x: | Nothing is playing at the moment.')

  if (!args[0])
    return [
      message.delete(),
      message.channel.send(new Discord.RichEmbed()
                          .setDescription(`The Current Volume is **${queue.volume} / 100**`)
                          .setColor(client.color))
    ];
  if (isNaN(args[0]))
    return message.channel.send(':x: | Please enter a number!')
  if (args[0] < 0 || args[0] > 100)
    return message.channel.send(':x: | Please enter a volume from 0 to 100 only!')

  queue.volume = args[0];
  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

  return message.channel.send(
    new Discord.RichEmbed()
    .setDescription(`Volume Has Been Set To **${queue.volume} / 100**`)
    .setColor(client.color)
    
  );
  }
}