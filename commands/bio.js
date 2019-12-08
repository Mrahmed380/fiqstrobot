let db = require("quick.db");
let fs = require('fs')
module.exports = {
  name: 'bio',
  description: 'Sets a bio for your profile.',
  usage: ' <bio>',
  args: true,
  category: 'misc',
  execute: async (client, message, args) => {
    
    db.set(`userInfo_${message.author.id}.bio` , args.join(" "))
    
    message.channel.send('Set bio to `' + args.join(' ') + '`')
  }
} //come to profile 