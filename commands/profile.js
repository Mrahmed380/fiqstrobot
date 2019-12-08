let Canvas = require('canvas')
let Discord = require('discord.js')
let db = require('quick.db')
module.exports = {
  name: 'profile',
  description: 'Shows the current user\'s information',
  usage: ' <user> (optional)',
  category: 'misc',
  execute: async (client, message, args) => {
    let user = message.mentions.users.first() || message.author;
     var output = await client.eco.FetchBalance(user.id)
  var outputrank = await client.eco.Leaderboard({
        filter: x => x.balance > 50,
        search: user.id
      })
  
  var lboutput = await client.leveling.Leaderboard({
      search: user.id
    });

    var lvloutput = await client.leveling.Fetch(user.id);
  
    
    let emojis = {
      dnd: "<:dnd:653121811248185363>",
      offline: "<:offline:653123208270315532>",
      online: "<:online:653121693379723285>",
      idle: "<:idle:653121430489399326>"
    };
    
    let pres = emojis[user.presence.status];
    let kok = await db.fetch(`userInfo_${user.id}.bio`)
    if(kok === null) kok = "No bio set."
    message.channel.send(new Discord.RichEmbed() 
                        .setAuthor(`${user.username}`)
                        .setThumbnail(user.displayAvatarURL)
                        .setColor(client.color)
                        .addField('Balance', output.balance + client.currencyEmote, true)
                        .addField('Economy Rank', outputrank, true)
                        .addField('Level', `Level ${lvloutput.level} / ${lvloutput.xp}XP`, true)
                        .addField('Leveling Rank', lboutput, true)
                        .addField('Status', pres, true)
                        .addField('Bio', kok)
                        
                        )
  }
}