const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test_command')
		.setDescription('Что-то делает')
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
                return interaction.reply("Команда только для разработчиков")
            }
            
    }
}