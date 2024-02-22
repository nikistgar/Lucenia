require('dotenv').config();
const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits, client, InteractionType } = require('discord.js');

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
			await command.execute(interaction, exports, client)
		} catch (error) {
			console.error(error)
			var errorContent = { content: `Тут скорее всего ошибка\`\`\`js\n${error.stack}\`\`\``, ephemeral: true }
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