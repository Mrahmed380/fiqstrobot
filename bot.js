const Discord = require("discord.js");
const client = new Discord.Client({
  //disableEveryone: true,
  fetchAllUsers: true
}); 

const fs = require("fs");
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(process.env.YTTOKEN);
const http = require("http");
const express = require("express"); 
const app = express(); 
const db = require('quick.db')
const mongoose = require('mongoose')
const config = require("./settings/config.json");
const pf = new db.table('prefix')
let bio = require('./json/bio.json')

client.config = require('./settings/config.json') //fill up your desired color in config.json it will automatically sync it here
client.leveling = require('discord-leveling')
client.levels = require('discord-xp')
client.youtube = new YouTube(process.env.YTTOKEN); 
client.queue = new Map(); // Music Queue
client.votes = new Map();
client.afk = new Map();
client.prefix = 'f.';
client.level = new db.table('lvl');
client.commands = new Discord.Collection();
client.color = config.embedColor;
client.eco = require('discord-economy');
client.shop = new db.table('shop');
client.sniper = new Map();
client.currencyEmote = '<:coin2:647720769429700609>'


const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));
let fetch = require("node-fetch");
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", async () => {
  client.user.setStatus("dnd");
  client.user.setActivity(`prefix: ${client.prefix}`, { type: "LISTENING" });
  console.log(`Tag : ${client.user.tag} \nID : ${client.user.id}`);
});

client.on('disconnect', () => console.log('I disconnected!'));

client.on('reconnecting', () => console.log('I am reconnecting!'));

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel
  const serverQueue = client.queue.get(oldMember.guild.id);


  if(oldUserChannel === undefined && newUserChannel !== undefined) {
 
  } else if(newUserChannel === undefined){
      if(oldMember.id === '514856260353392660'){
          return console.log("BOT");
      }
      else{
          if(client.guilds.get(oldMember.guild.id).voiceConnection != null){
              if(client.guilds.get(oldMember.guild.id).voiceConnection.channel.id === oldUserChannel.id){
                    if(oldUserChannel.members.size < 2){
                        serverQueue.songs = [];
                        serverQueue.connection.dispatcher.end('No members left in the channel!')
                    }    
              }else{
                  return console.log('not in the same voice channel');
              }
          }else{
              return undefined;
        }
      }         
  }
})

client.on("message", async (message) => {

  
  if (!message.content.startsWith(client.prefix) || message.author.bot) return;
  const args = message.content.slice(client.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  var profile = await client.leveling.Fetch(message.author.id)
  client.leveling.AddXp(message.author.id, 10)
  if (profile.xp + 10 > 100) {
    if(message.guild.id === '264445053596991498') return console.log('I cannot level up in dbl servers!')
    
    await client.leveling.AddLevel(message.author.id, 1)
    await client.leveling.SetXp(message.author.id, 0)
    message.reply(`Congratulations! You just leveled up to level **${profile.level + 1}**!`)
  }

 if(!bio[message.author.id]) {
   bio[message.author.id] = {
     bio: 'This user doesn\'t have any bio.'
   }
 }
  
  
  if(client.commands.has(commandName)) {
    
    let props = require(`./commands/${commandName}`);
    props.execute(client, message, args);
    
  }
});

client.on("message", async (message) => {
  if (message.channel.id !== "646019326167744533") return;
  if (!message.guild) return;
  const args = message.content

  await fetch(
    "http://zkateki.glitch.me/api/chatbot/" + encodeURI(args)
  )
    .then(res => res.json())
    .then(chatty =>{
  
      message.channel.send(
        new Discord.RichEmbed()
          .setDescription(chatty.chat)
          .setColor("BLURPLE"))
          
          console.log(chatty)}
          
    );



});




client.on("messageDelete" , async message => {
  
  let construct = {
    message: message.content,
    author: message.author.tag,
    avatar: message.author.displayAvatarURL
  };
  
  client.sniper.set(message.channel.id, construct);
  
});








client.login(process.env.TOKEN);

app.listen(process.env.PORT); //try now works!
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
app.use(express.static('public'));



//file sender kkkkk   k


app.get('/',function (req , res) {
        res.sendFile(__dirname + '/views/index.html');
        })
//bro sux


//afk kiker what u trynna do

client.on("message" , async (message) => {
  let runner = require("./global/afk.js");
  runner.execute(client, message, db);
})

client.on('message', async message => {
  let runner = require('./global/leveling.js')
})


client.on("guildMemberAdd", async (user) => {
 let runner = require("./global/autoRole.js");
  runner.run(client, user, db);
}) 