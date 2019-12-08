let Discord = require("discord.js");
let moment = require("moment");
require("moment-duration-format");
let db = require("quick.db");

module.exports = {
  name: "afk",
  description: "Set Yourself Afk",
  category: "fun",
  execute: async (client, message, args) => {
    
    
    let construct = {
      user: message.author.tag,
      avatar: message.author.displayAvatarURL,
      time: Date.now(),
      reason: args.join(" ") || "Hi, I am Afk!"
    };
    
    let afk1 = await db.fetch(`AFK_${message.author.id}`);
    
    if(afk1 === null) {
      
    await db.set(`AFK_${message.author.id}` , construct);
    await db.set(`AFKpings_${message.author.id}` , 0);  
      message.channel.send({
        embed: new Discord.RichEmbed()
        .setTitle("Afk Set!")
        .setDescription(construct.reason)
        .addField("User:" , construct.user)
        .setColor(client.color)
        .setTimestamp()
      })
      
      
    } else {
      
      await db.delete(`AFK_${message.author.id}`);
      await db.delete(`AFKpings_${message.author.id}`);
      
      message.channel.send({
        embed: new Discord.RichEmbed()
        .setTitle("Your Afk Has Been Revoked!")
        .setDescription("Your Afk Deleted, now The Bot wont protect you from Pings!")
        .setColor(client.color)
        .setTimestamp()
      })
      
    }
    
    
    
  }
}