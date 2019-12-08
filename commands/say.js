module.exports = {
  name: 'say',
  description: 'Makes the bot say something.',
  usage: ' <message>',
  category: 'misc',
  args: true,
  execute(client, message, args) {
    
    message.channel.send(`${args.join(' ')} \n\n\n\n\n- ${message.author.tag}`)
    message.delete().catch(O_o=>{})
  }
}