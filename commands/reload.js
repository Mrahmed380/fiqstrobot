module.exports = {
	name: 'reload',
	description: 'Reloads a command (DEV ONLY)',
  category: 'dev',
	execute(client, message, args) {
    
     if(message.author.id !== "400845681574674442" && message.author.id !== "544922024301297691") return message.channel.send("This is a dev-only command.")
    
		if (!args.length) return message.channel.send(`:x: | There is nothing to reload!`);
const commandName = args[0].toLowerCase();
const command = message.client.commands.get(commandName)
	|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

if (!command) return message.channel.send(`:x: | There is no command with the name \`${commandName}\``);
    
     delete require.cache[require.resolve(`./${commandName}.js`)];

		try {
			const newCommand = require(`./${commandName}.js`);
			message.client.commands.set(newCommand.name, newCommand);
		} catch (error) {
			console.log(error);
			return message.channel.send(`:x: | Unable to reload \`${commandName}\`:\n\`${error.message}\``);
		}
		message.channel.send(`<:coin2:647720769429700609>Command \`${commandName}\` was reloaded!`);
    
	},   
  
};