const Discord = require('discord.js');

module.exports = {
  name: 'pause',
  category: "music",
  description: 'Pauses the current song that is playing.',
  execute: async (client, message, args) => {
    let queue = client.queue.get(message.guild.id);

  if (queue && queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause();
    return message.channel.send('Song paused. :pause_button: ')
  }

  return message.channel.send(':x: | Nothing is playing at the moment.')
  }
}