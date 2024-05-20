const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('Отправляет сообщение от имени бота (Админ)')
        .addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('Канал для отправки')
				.setRequired(true))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Сообщение')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, exports, client) {  
            const channel = await interaction.options.getChannel('channel');
            const messagecon = await interaction.options.getString('message');
            await channel.send(messagecon);
            await interaction?.reply({content: `Message sent in ${channel}!`, ephemeral: true}).catch(()=>{});
            
    }
}