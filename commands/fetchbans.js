let Discord = require('discord.js')

module.exports = {
name: 'fetchbans',
description: 'Fetchs the current server bans',
category: 'moderation', 
execute: async (client, message, args) => {
  
  if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(':x: | Sorry, but you cannot use this command!')
  
  message.guild.fetchBans().then(bans => {
    let banlist = bans.map(d => d.username)
    if(banlist === '[]') banlist = "None"
message.channel.send(new Discord.RichEmbed()
                    .setTitle("Bans")
                    .setColor(client.color)
                    .setFooter(`Total Bans: ${bans.size}`)
                    .setDescription(`\`${banlist}\``)
                    )
  })
  }
}