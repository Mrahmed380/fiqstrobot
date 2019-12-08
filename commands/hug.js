module.exports = {
name: 'hug',
description: 'Makes you hug someone',
category: 'fun',
usage: ' <user>',
execute: async (client, message, args) => {
  let user = message.mentions.users.first();
  if(!user) return message.channel.send(':x: | Please mention a user!')
  let replies = [
    `${message.author.username} hugs ${user.username}`,
    `${message.author.username} hugs ${user.username} but then ${user.username} rejects his/her hug then slaps him/her.`
  ]
  
  let random = Math.floor(Math.random() * replies.length)
  message.channel.send(replies[random])
}}