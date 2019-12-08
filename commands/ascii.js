let Discord = require('discord.js');
let asciify = require('figlet');


module.exports = {
  name: "ascii",
  description: "Asciify Your text",
  args: true,
  category: 'misc',
 usage: "ascii [text]",
  execute: async (client, message, args) => {
 
  asciify(args.join(' ') , function(err, data) {
    message.channel.send(`\`\`\`${data}\`\`\``)
    
  })  //yeet it works

  }
}