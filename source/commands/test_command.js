const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test_command')
		.setDescription('Что-то делает (dev)')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Сообщение')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, client) {
        if (interaction.user.id != process.env.OWNER_ID)
            {
                return interaction.reply({content: "Команда только для разработчиков", ephemeral: true})
            };

        client.userJsonCheck(interaction.user.id);

        interaction.reply({content: "Работает", ephemeral: true});
    }
}