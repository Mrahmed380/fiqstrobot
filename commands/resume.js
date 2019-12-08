const Discord = require('discord.js')

module.exports = {
  name: 'resume',
  category: 'music',
  description: 'Resumes a paused song',
  execute: async (client, message, args) => {
     let queue = client.queue.get(message.guild.id);

  if (queue && !queue.playing) {
    queue.playing = true;
    queue.connection.dispatcher.resume();
    return message.channel.send('Song resumed. :arrow_forward: ')
  }

  return message.channel.send(':x: | Nothing is playing at the moment.')
  }
}