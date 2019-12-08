module.exports = {
  name: 'kill',
  description: 'Kills a user.',
  category: 'fun',
  usage: ' <user> (optional)',
  execute: async (client, message, args) => {
    let user1 = message.author;
    let user2 = message.mentions.users.first() || message.author;
    
    let items = [
     'Diamond Sword',
     'Iron Sword',
     'Stone Sword',
     'Gold Sword',
     'Wooden Sword'
    ]
    
    let random = Math.floor(Math.random() * items.length); //kek

    message.channel.send(`${user1.username} killed ${user2.username} using **${items[random]}**`)
    
  }
}