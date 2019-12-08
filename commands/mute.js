const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
  name: 'mute',
  description: 'Takes away the permission to speak from a user.',
  category: 'moderation',
  usage: ' <user> <time>',
  execute: async (client, message, args) => {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(":x: | Please tag user to mute!");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: | Sorry, you don't have permissions to use this!");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: | Sorry, i cannot mute this user.");
  if (tomute.id === message.author.id) return message.channel.send(":x: | Sorry, you cannot mute yourself!");
  let muterole = message.guild.roles.find(`name`, "Muted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let mutetime = args[1];
  if(!mutetime) return message.channel.send(":x: | You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
  }, ms(mutetime));

}
  }
