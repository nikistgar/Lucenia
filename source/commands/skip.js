const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Скипает трек')
        .setDMPermission(true),
	async execute(interaction, client) {
        const queue = client.player.nodes.get(interaction.guild)

        if (queue != null)
        {
            queue.node.skip();
            interaction.reply("skipping...")
        }
        else
        {
            interaction.reply('В очереди нет треков')
        }
    }
}