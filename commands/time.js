let ctz = require("city-timezones");
let Discord = require("discord.js");
const geoTz = require("geo-tz");
const moment = require("moment");
require("moment-timezone");

module.exports = {
  name: "time",
  description: "Shows The Time of the City Provided",
  category: "misc",
  usage: " <city>",
  execute: async (client, message, args) => {
    var june = moment(Date.now());
    const cityLookup = ctz.lookupViaCity(args.join(" "));
    if (!cityLookup[0])
      return message.channel.send(":x: | Location not Found!");
    const output = cityLookup[0];
    let time = geoTz(output.lat, output.lng);
    let output1 = june.tz(time[0]).format("ha z");
    let embed = new Discord.RichEmbed()
      .setTitle(`Time Of ${output.city}`)
    .setDescription(`The Time is **${output1}**`)
    .setFooter(`${output.city}, ${output.country}`)
    .setColor(client.color);

    message.channel.send({
      embed: embed
    });
  }
};
