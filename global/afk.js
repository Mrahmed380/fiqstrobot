let Discord = require("discord.js");
let moment = require("moment");
require("moment-duration-format");

module.exports.execute = async (client, message, db) => {
   if(message.author.bot || message.guild) return;
   let checker1 = message.mentions.users.first();
   if(!checker1) return;
  
  let checker2 = await db.fetch(`AFK_${checker1.id}`)
  if(checker2 === null) return;
  
  message.channel.send({
    embed: new Discord.RichEmbed()
    .setTitle(`${checker2.user} Is Currently Afk!`)
    .setDescription(`This User has Set themselves to afk, which means they wouldn't me responding to any of your pings!`)
    .addField("Reason" , checker2.reason)
    .addField("Afk Since" , `${moment.duration(Math.floor(Date.now() - checker2.time)).format("D[d] H[h] m[m] s[s]")}`)
    .setThumbnail(checker2.avatar)
    .setColor(client.color)
    .setTimestamp()
  });
  
  await db.add(`AFKpings_${checker1.id}` , 1);
  
  /*  let construct = {
      user: message.author.tag,
      avatar: message.author.displayAvatarURL,
      time: Date.now(),
      reason: args.join(" ") || "Hi, I am Afk!"
    };*/
  
};