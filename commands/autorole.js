let db = require("quick.db"); //./global/autoRole.js is the handling file
let Discord = require("discord.js");

module.exports = {
  name: "autorole",
  category: "management",
  description:
    "Sets a role for the bot to add to a new member every time a new member joins.",
  usage: " <role | @role>",
  execute: async (client, message, args) => {
    if (
      args[0] !== undefined &&
      args[0].toLowerCase() === "disable" &&
      (await db.fetch(`autoRole_${message.guild.id}`)) === null
    ) {
      message.channel.send(":x: | AutoRole is not yet enabled on this server!");
    } else if (args[0] !== undefined && args[0].toLowerCase() === "disable") {
      await db.delete(`autoRole_${message.guild.id}`);
      message.channel.send(`Autorole has Been Disabled!`);
    }

    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        ":x: | Sorry, but you don't have permission to use this command!"
      );
    let role = message.guild.roles.find(r => r.name.toLowerCase() === args.join(" ")) || message.mentions.roles.first();//dis should work
    if (!role)
      return message.channel.send(
        ":x: | Please provide a valid Role!");
    await db.set(`autoRole_${message.guild.id}`, role.id);
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setTitle("AutoRole Enabled!")
        .setDescription(`Autorole has been set to this Role : ${role}`) //no its embed it wont ping
        .setTimestamp()
        .setColor(client.color)
    });
  }
};
