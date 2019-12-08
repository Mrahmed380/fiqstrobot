var eco = require('discord-economy');//ok
let Discord = require('discord.js')
var client = new Discord.Client();

eco.Leaderboard({
        limit: 15, 
        filter: x => x.balance > 50 
      }).then(async users => {
  var finalLb = ''
  var i = 0;
  var indexnum = 0;
  for (i in users) {
finalLb += `${++indexnum}. ${await client.fetchUser(users[i].userid)} - $${users[i].balance}` 
let leaderboard = document.getElementById('leaderboard').innerHTML(finalLb) 
console.log(finalLb)
  }
})



// how do you append finalLb into leaderboard element
//i hab no idea