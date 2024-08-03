const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('Отправляет сообщение от имени бота (dev)')
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
		.setDMPermission(false),
	async execute(interaction) {
        if (interaction.user.id != process.env.OWNER_ID)
            {
                return interaction.reply({content: "Команда только для разработчиков", ephemeral: true})
            }
        const channel = await interaction.options.getChannel('channel');
        const messagecon = await interaction.options.getString('message');
        await channel.send(messagecon);
        await interaction?.reply({content: `Message sent in ${channel}!`, ephemeral: true}).catch(()=>{});
            
    }
}