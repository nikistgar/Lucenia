const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exit')
		.setDescription('Бот выйдет из канала')
        .setDMPermission(true),
	async execute(interaction, client) {
        const queue = client.player.nodes.get(interaction.guild)

        queue.delete();

        interaction.reply("Выхожу из канала")
    }
}