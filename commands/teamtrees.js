let Discord = require("discord.js");
const { TeamTrees } = require("teamtrees-api");
const teamTrees = new TeamTrees();

module.exports= {
  name: 'teamtrees',
  description: 'Shows the current amount of trees being donated to teamtrees.org',
  category: 'misc',
  execute: async (client, message, args) => {
     const count = await teamTrees.getTotalTrees(true);
  const left = await teamTrees.getLeft(true);
  let embed = new Discord.RichEmbed()
    .setAuthor(
      "TeamTrees",
      `https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Team_Trees_circle_logo.svg/1200px-Team_Trees_circle_logo.svg.png`
    )
    .setThumbnail(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Team_Trees_circle_logo.svg/1200px-Team_Trees_circle_logo.svg.png"
    )
    .setURL("https://teamtrees.org")
    .addField(`Trees Planted`, `**[${count}](https://teamtrees.org/)**`, true)
    .addField(
      `Trees Left`,
      `**[${left.treesLeft.amount.fixed} (${left.treesLeft.percent}%)](https://teamtrees.org/)**`,
      true
    )
    .setColor(client.color)
    .setTimestamp();
  message.channel.send(embed);
  }
}