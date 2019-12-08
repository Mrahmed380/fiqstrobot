const Discord = require('discord.js')
const embed = new Discord.RichEmbed();
module.exports = {
  name: "skip",
  category: 'music',
  description: "Skips a song that is playing.",
  execute: async (client, message, args) =>{
    let queue = client.queue.get(message.guild.id)
  const vcvote = Math.floor(message.guild.me.voiceChannel.members.size / 2)
  const oki = Math.floor(message.guild.me.voiceChannel.members.size / 2 - 1)
 if(message.member.roles.find("name", "DJ")){
  let queue = client.queue.get(message.guild.id);
  if (!message.member.voiceChannel) return message.channel.send(':x: | Please join a voice channel to use this command!')
   if (!queue) return message.channel.send(':x: | No song found in the queue.')
   queue.connection.dispatcher.end()}
  else if(message.guild.me.voiceChannel.members.size < 3){
    let queue = client.queue.get(message.guild.id);
    if (!message.member.voiceChannel) return message.channel.send(':x: | Please join a voice channel to use this command!')
    if (!queue) return message.channel.send(':x: | No song found in the queue.')
    queue.connection.dispatcher.end()}
  else if (message.guild.me.voiceChannel.members.size < 3) {
    if (!queue) return message.channel.send(':x: | No song found in the queue.')
    if (!message.author.voiceChannel) return message.channel.send(':x: | Please join a voice channel to use this command!')
    else return queue.connection.dispatcher.end()
  }
  else
  {
    let queue = client.queue.get(message.guild.id);
    let votes = client.votes.get(message.guild.id);
    if (!message.member.voiceChannel) return message.channel.send(':x: | Please join a voice channel to use this command!')
    if (!queue) return message.channel.send(':x: | No song found in the queue.')
    
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        if (votes.voters.includes(message.author.id)) return message.channel.send(':x: | You have already voted!')
        votes.votes++
        votes.voters.push(message.author.id);
        message.channel.send(embed.setDescription(`You have voted to skip the current song! ${votes.votes}/${vcvote} votes currently. We need ${Math.floor(vcvote - votes.votes)} more to skip this song!`).setColor(message.guild.me.displayHexColor));
       if(!queue) return message.channel.send(':x: | No song found in the queue.')
        if (votes.votes > oki) return queue.connection.dispatcher.end();
    } else return queue.connection.dispatcher.end();
    
}
  }
}