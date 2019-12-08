let Discord = require("discord.js");
module.exports = {
  name: "rank",
  description: "Shows your current level and rank.",
  category: "lvl",
  execute: async (client, message, args) => {
    var user =
      message.mentions.users.first() ||
      client.users.get(args[0]) ||
      message.author;
    var lboutput = await client.leveling.Leaderboard({
      search: user.id
    });

    var output = await client.leveling.Fetch(user.id);
    console.log(lboutput);
    message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(user.username + "")
        .setThumbnail(user.avatarURL)
        .addField("Level", output.level,true)
        .addField("XP", output.xp ,true)
        .addField("Rank", lboutput)
        .setColor(client.color)
    );
  }
};
