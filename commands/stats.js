const Discord = require("discord.js")
 const os = require('os')
 const cpuStat = require("cpu-stat");
 const moment = require("moment") 

module.exports = {
  name: 'stats',
  description: 'Shows the bot stats',
  category: 'dev',
  execute: async (client, message, args) => {
    
    let { version } = require("discord.js");
     
            cpuStat.usagePercent(function(err, percent, seconds) {
              if (err) {
                return console.log(err);
              }
             
           
    
      let embedStats = new Discord.RichEmbed()
             .setTitle("Stats")
              .setThumbnail(client.user.avatarURL)
             .setColor("#00ff00")
             .addField("➤ Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
             .addField("➤ Uptime ", `${moment.duration(client.uptime).format("D[d] H[h] m[m] s[s]")}`) 
             .addField("➤ Users", `${client.users.size.toLocaleString()}`, true)
             .addField("➤ Servers", `${client.guilds.size.toLocaleString()}`, true)
             .addField("➤ Channels ", `${client.channels.size.toLocaleString()}`, true)
             .addField("➤ Discord.js", `v${version}`, true)
             .addField("➤ Node", `${process.version}`, true)
             .addField("➤ Cores" , `${os.cpus().length}` , true)
             .addField("➤ CPU", `${os.cpus().map(i => `${i.model}`)[0]}`)
             .addField("➤ CPU usage", `${percent.toFixed(2)}%`,true)
             .addField("➤ Arch", `${os.arch()}`,true)
             .addField("➤ Platform", `${os.platform()}`,true)
      .setColor(client.color)
             .setFooter("Fashishi stats")
     
             message.channel.send(embedStats)
  }
                                 )}}