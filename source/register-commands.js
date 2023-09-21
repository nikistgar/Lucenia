require('dotenv').config();
const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits, InteractionType } = require('discord.js');

/*const commands = [
  {
    name: 'schedule',
    description: 'Расписание',
  },
  {
    name: 'send',
    description: ''
    
  }
  {
    name: 'startgym',
    description: 'Начинает ивент качалки',
  },
];*/

/*const schedule = new SlashCommandBuilder()
  .setName('schedule')
	.setDescription('Расписание')
	.setDMPermission(false)

const schedule = new SlashCommandBuilder()
  .setName('schedule')
	.setDescription('Расписание')
	.setDMPermission(false)
  .addStringOption(option =>
      option
        .setName('channel')
        .setDescription('channel')
        .setRequired(true))
  .addStringOption(option =>
      option
        .setName('channel')
        .setDescription('channel')
        .setRequired(true))
//const commands = [
  //schedule
  //.setName('schedule')
	//	.setDescription('Расписание')
	//	.setDMPermission(false)
  /*send()
  .setName*/
//]



/*const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Slash commands were registered successfully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();*/

async function RegisterClientCommands(client) {
	const { REST } = require('@discordjs/rest')
	const { Routes } = require('discord-api-types/v10')
	const fs = require('fs')
	
	const commands = []
	const commandFiles = fs.readdirSync(process.env.RESOURCE_PATH + `/source/commands`).filter(file => file.endsWith('.js'))
	
	
	for (const file of commandFiles) {
		const command = require(process.env.RESOURCE_PATH + `/source/commands/${file}`)
		commands.push(command.data.toJSON())
		client.commands.set(command.data.name, command)
	}
	
	const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

	// compat: remove existing commands for homeguild
	if (process.env.GUILD_ID != '') {
		rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: {} })
	}
	await rest.put(
		Routes.applicationCommands(process.env.CLIENT_ID),
		{ body: commands },
	)
	
	client.on('interactionCreate', async interaction => {
		if (interaction.type != InteractionType.ApplicationCommand) return
		
		const command = client.commands.get(interaction.commandName)
		
		if (!command) return
		
		try {
			await command.execute(interaction, exports) // we need to pass exports here, otherwise we won't be able to access them inside the command
		} catch (error) {
			console.error(error)
			var errorContent = { content: `There was an error while executing this command, please report the following stack trace here: <https://github.com/Blumlaut/EasyAdmin/issues> \`\`\`js\n${error.stack}\`\`\``, ephemeral: true }
			if (interaction.replied) {
				interaction.followUp(errorContent)
				
			} else {
				interaction.reply(errorContent)
			}
		}
	})
  console.log('succesful')
}

module.exports = { RegisterClientCommands };