const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Пауза музыки')
        .setDMPermission(true),
	async execute(interaction, client) {
        const queue = client.player.nodes.get(interaction.guild)

        queue.node.pause();

        interaction.reply("Поставлено на паузу")
    }
}