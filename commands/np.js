const Discord = require('discord.js')

let embed = new Discord.RichEmbed();
let embed2 = new Discord.RichEmbed();
module.exports = {
  name: 'np',
  description: 'Shows the information of the current song that is playing.',
  category: 'music',
  execute: async (client, message, args) => {
    let queue = client.queue.get(message.guild.id);
  
  let moment = require('moment');
  require('moment-duration-format');
  
  if (!queue) {
    message.channel.send(':x: | There is nothing playing at the moment.')
  let music = queue.musics[0]
  
  message.channel.send(embed2
                              .setColor(client.color)
                              .setAuthor(' | Now Playing!' , client.user.displayAvatarURL)
                              .addField('Title' , `**[${music.title}](${music.url})**`)
                              .addField('Author' , `**[${music.ct}](${music.channelURL})**` , true)
                              .addField('Duration' , `**${moment.duration(music.duration).format("DD:HH:mm:ss")}**` , true)
                              .addField('Published' , `**${moment(music.published).format("dddd, MMMM do YYYY")}**`) 
                                   .setTimestamp()        
                              .setThumbnail(music.thumbnail))
  
}
}}