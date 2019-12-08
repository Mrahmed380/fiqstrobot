let Discord = require('discord.js')

module.exports = {
name: 'fetchban',
description: 'Fetchs a banned user\'s info.',
category: 'moderation', 
args: true,
execute: async (client, message, args) => {
  
  if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(':x: | Sorry, but you cannot use this command!')
  
  message.guild.fetchBan(args[0]).then(({ user, reason }) => {
    let type = user.bot;
    if(type === true) type = "Bot"
    if(type === false) type = "User"
    message.channel.send(new Discord.RichEmbed()
                        .setAuthor(`Banned User`)
                        .addField("Username", `${user.username}#${user.discriminator}`)
                        .addField("Banned Reason", reason)
                        .addField("ID", `${user.id}`)
                        .addField("Type", type)
                         .setColor("BLURPLE")
                        )
    console.log(user)
  })
                              
                              

}}