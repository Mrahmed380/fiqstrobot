const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: 'Shows a list of commands.',
  usage: '<command>',
  category: 'misc',
  execute: async (client, message, args) => {
  let data = [];
    if(!args.length) {
    
    let embed = new Discord.RichEmbed()
    .setTitle("Help")
    .addField("Misc (" + client.commands.filter(i => i.category === 'misc').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'misc').map(i => i.name).join('`, `') + "`")
    .addField("Music (" + client.commands.filter(i => i.category === 'music').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'music').map(i => i.name).join('`, `') + "`")
     .addField("Fun (" + client.commands.filter(i => i.category === 'fun').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'fun').map(i => i.name).join('`, `') + "`")
      .addField("Economy (" + client.commands.filter(i => i.category === 'economy').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'economy').map(i => i.name).join('`, `') + "`")
      .addField("Moderation (" + client.commands.filter(i => i.category === 'moderation').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'moderation').map(i => i.name).join('`, `') + "`")
      .addField("Images (" + client.commands.filter(i => i.category === 'image').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'image').map(i => i.name).join('`, `') + "`")
      .addField("Management (" + client.commands.filter(i => i.category === 'management').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'management').map(i => i.name).join('`, `') + "`")
    .addField("Leveling (" + client.commands.filter(i => i.category === 'lvl').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'lvl').map(i => i.name).join('`, `') + "`")
    .addField("NSFW (" + client.commands.filter(i => i.category === 'nsfw').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'nsfw').map(i => i.name).join('`, `') + "`")
    .addField("Developer [not for you] (" + client.commands.filter(i => i.category === 'dev').map(i => i.name).length + ")", "`" + client.commands.filter(i => i.category === 'dev').map(i => i.name).join('`, `') + "`")
    .setColor(client.color)
    .setFooter(`Total Commands: ${client.commands.size}`);
      message.channel.send({embed : embed})
    } else {
  const name = args[0]
const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name));

if (!command) {
	return message.reply(':x: | That\'s not a valid command!');
}

data.push(`**Name:** ${command.name}`);

if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
if (command.description) data.push(`**Description:** ${command.description}`);
if (command.usage) data.push(`**Usage:** ${client.prefix}${command.name} ${command.usage}`);

data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

message.channel.send(data, { split: true });
   
    
    
    }
    
  }}


