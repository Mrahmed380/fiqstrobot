module.exports = {
  name: 'stop',
  description: 'Stops the current song that is playing.',
  category: 'music',
  execute: async (client, message, args) => {
    let queue = client.queue.get(message.guild.id);
  if (!message.member.voiceChannel)
    return message.channel.send(':x: | You are not in a voice channel!')
  if (!queue)
    return message.channel.send(':x: | Nothing is playing at the moment')

  queue.musics = [];
  queue.connection.dispatcher.end();
  }
}