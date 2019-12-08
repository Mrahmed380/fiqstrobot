const Discord = require('discord.js')

module.exports = {
  name: 'eval',
  description: 'Nothing to see here ;)',
  category: 'dev',
  execute (client, message, args) {
     if(message.author.id !== "400845681574674442" && message.author.id !== "555703466106814506" && message.author.id !== "544922024301297691" && message.author.id !== "637131724878381057") return message.channel.send(":x: | This is a dev-only command.")
  
    function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
    try {
    let c = args.join(' ')
    let e = eval(c)
    if(typeof e !== "string") {
      e = require("util").inspect(e);
      
      let embed = new Discord.RichEmbed()
      .setTitle("Eval Sucsess")
      .setDescription("```xl\n" + clean(e) + "```")
      .setColor(client.color)
      message.channel.send(embed)
    } 
  } catch (err) {
    console.log(err)
    const embed = new Discord.RichEmbed()
    .setTitle("ERROR")
    .setDescription("```xl\n" + err + "```")
    .setColor(client.color)
    
    message.channel.send(embed).catch(O_o=>{})
  }
  }
}