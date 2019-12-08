let Canvas = require('canvas')
let Discord = require('discord.js')

module.exports = {
  name: 'kiss',
  description: 'Makes you or another person kiss someone.',
  usage: ' <user>',
  category: 'image',
  args:true,
  execute: async (client, message, args) => {
    const canvas = Canvas.createCanvas(768, 574)
  const ctx = canvas.getContext('2d')
  
  
  
let user = message.mentions.users.first().displayAvatarURL
let user1 = message.mentions.users.last().displayAvatarURL
  
  if(user1 === user) user1 = message.author.avatarURL
  
  const background = await Canvas.loadImage('https://www.verywellmind.com/thmb/ww8drf5Q9efuk0I8uUSUBMQpONk=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-471932267-58bc89565f9b58af5ca9d09d.jpg')
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  
  const avatar = await Canvas.loadImage(user);
	ctx.drawImage(avatar, 370, 25, 200, 200);
  
   const avatar1 = await Canvas.loadImage(user1);
	ctx.drawImage(avatar1, 150, 25, 200, 200);
  
 const attachment = new Discord.Attachment(canvas.toBuffer(), 'kiss.png');
  
  
  message.channel.send(attachment)
  }
}