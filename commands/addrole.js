let Discord = require('discord.js')

module.exports = {
  name: 'addrole',
  description: 'Adds a role to a user.',
  usage: ' <user> <role>',
  category: 'management',
  execute: async (client, message, args) => {

  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(":x: | You don't have premmsions to do that!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send(":x: | Please mention a valid user!");

  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send(":x: | Please specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.channel.send(":x: | Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.channel.send(":x: | This user already have that role.");
  await(rMember.addRole(gRole.id));

    await message.channel.send(`Sucsessfully gave ${rMember.user.username} the \`${gRole.name}\` role!`)
  }
}