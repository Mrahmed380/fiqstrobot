const discord = require("discord.js");
const embed = new discord.RichEmbed();

module.exports = {
  name: 'loop',
  category: 'music',
  description: 'loops the current song playing',
  execute: async (client, message, args) => {
     const queue = client.queue.get(message.guild.id);
  if (!message.member.voiceChannel)
    return message.channel.send(":x: | You are not in a voice channel?");
  if (!queue) return message.channel.send(":x: | I am not playing anything?");
  queue.loop = !queue.loop;
  client.queue.set(message.guild.id, queue);
  if (queue.loop) return message.channel.send(new discord.RichEmbed()
                                             .setDescription("**Enabled Looping!**")
                                             .setColor(client.color));
  return message.channel.send(new discord.RichEmbed()
                             .setDescription("**Disabled Looping!**")
                             .setColor(client.color));
  }
}