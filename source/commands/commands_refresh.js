const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands_refresh')
		.setDescription('Перезагружает команды бота (Не используется)')
		.setDMPermission(false),
	async execute(interaction ) {
        if (interaction.user.id != process.env.OWNER_ID)
            {
                return interaction.reply({content: "Команда только для разработчиков", ephemeral: true})
            }
        /*const { REST } = require('@discordjs/rest')
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
        )*/
        await interaction?.reply({content: `Commands refreshed`, ephemeral: true}).catch(()=>{});
        console.log('Commands refreshed')
    }
}