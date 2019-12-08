module.exports = {
  name: 'rate',
  description: 'Makes me rate if the user is my type or not.',
  usage: ' <user>',
  category: 'fun',
  args: true,
  execute: async (client, message, args) => {
    let ratus = message.mentions.members.first();
let rates = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

let result = Math.floor((Math.random() * rates.length));

if(ratus.user.id === message.author.id) {
  return message.channel.send(`**${message.author.username}**, I'd give you ${result}/10`);
} else return message.channel.send(`I'd give **__${ratus.user.username}__** ${result}/10`);

  }
}