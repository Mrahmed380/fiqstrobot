const Discord = require('discord.js')

module.exports = {
	name: 'ping',
  category: 'misc',
	description: 'Shows the ping',
	execute(client, message, args) {
message.channel.send('Pinging...').then(m => {
m.edit(new Discord.RichEmbed()
.setTitle('Pong!')
.setDescription(`API Ping : ${Math.round(client.ping)}ms\nBot Ping : ${Math.floor(Date.now() - m.createdTimestamp)}ms`)
.setColor(client.color)  )                       
})
	},
};