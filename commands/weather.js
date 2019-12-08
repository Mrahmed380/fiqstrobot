const Discord = require('discord.js')
let weather = require('weather-js')

module.exports = {
  name: 'weather',
  description: 'Shows the weather of a location',
  usage: ' <location>',
  category: 'misc',
  args: true,
  execute: async (client, message, args) => {
    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if(err) return;
        var current = result[0].current 
        var location = result[0].location 

        
        let embed = new Discord.RichEmbed()
           .setDescription(`**${current.skytext}**`) 
           .setAuthor(`Weather for ${current.observationpoint}`) 
           .setThumbnail(current.imageUrl) 
           .setColor(client.color) 
           .addField("Timezone", `UTC${location.timezone}`) 
           .addField("Degree Type", location.degreetype , true) 
           .addField("Temperature", `${current.temperature}`)
           .addField("Feels like", `${current.feelslike} Degrees`, true)
           .addField("Winds", current.winddisplay)
           .addField("Humidity", ` ${current.humidity}%` , true)
           .addField("Day", `${current.day}`)
           .addField("Date", `${current.date}`, true)
           
      
           message.channel.send(embed)

    });
    
    }
  }
