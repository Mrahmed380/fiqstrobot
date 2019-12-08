let Discord = require("discord.js");
let fetch = require("node-fetch");

module.exports = {
  name: "iphonex",
  description: "Turn Someone's Avatar into IPhone Res",
  usage: ' @user',
  category:"image",
  execute: async (client, message, args) => {
    
   let user = message.mentions.users.first() || client.users.get(args[0]) || message.author;
   let avatar = user.displayAvatarURL
   if(avatar.endsWith(".gif")) return message.channel.send(":x: | Sorry That is a Animated Avatar and cannot be put into an Iphone!");
    fetch("http://nekobot.xyz/api/imagegen?type=iphonex&url=" + avatar , {method : "GET"})
    .then(res => res.json())
    .then(m => {
      message.channel.send(new Discord.Attachment(m.message, "iphonex.png"))
    })    
  }}