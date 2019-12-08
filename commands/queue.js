const Discord = require('discord.js')
let looping;
module.exports = {
  name: 'queue',
  category: 'music',
  description: 'Shows the list of songs that will be played.',
  execute: async (client, message, args) => {
     let queue = client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(':x: | Nothing is playing at the moment')
  if (queue.loop) {
    looping = "Enabled";
  } else {
    looping = "Disabled";
  };
  
  let embed = new Discord.RichEmbed()
    .setColor(client.embedColor)
    .setThumbnail(message.guild.iconURL)
    .setTitle("Music Queue")
  .setColor(client.color)
    .setDescription(
      `${queue.musics
        .map(music => `- **[${music.title}](${music.url})**`)
        .join("\n")} `
    )
    .addField(
      "Now Playing",
      `[${queue.musics[0].title}](${queue.musics[0].url})`
    )
    .addField(
      "Settings",
      `Volume : **${queue.volume}**\nLooping: **${looping}**`
    );

  message.channel.send(embed);
  }
}