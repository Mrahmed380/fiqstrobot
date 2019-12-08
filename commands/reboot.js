module.exports = {
name: 'reboot',
description: 'Reboots the bot. (DEV ONLY)',
category: 'dev',
execute: async (client, message, args) => {
  
   if(message.author.id !== "400845681574674442" && message.author.id !== "544922024301297691" && message.author.id !== "555703466106814506") return message.channel.send(":x: | This is a dev-only command.")
  
  client.destroy()
  client.login(process.env.TOKEN) //fuku
  message.channel.send("Bot rebooted.")
}
}