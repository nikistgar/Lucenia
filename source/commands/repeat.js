const { SlashCommandBuilder } = require('discord.js');
const { QueueRepeatMode, Track } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('Управление повторением')
        .addStringOption(option =>
            option
                .setName('subcommand')
                .setDescription('subcommand')
                .setRequired(true)
                .addChoices(
                    { name: 'track', value: 'track', setDescription: 'Повторяет играющий трек'},
                    { name: 'queue', value: 'queue', setDescription: 'Повторяет всю очередь'},
                    { name: 'off', value: 'off', setDescription: 'Выключает повторение'},
                ))
                .setDMPermission(false),
	async execute(interaction, client) {
        const queue = client.player.nodes.get(interaction.guild)
        const subcommand = await interaction.options.getString('subcommand');
        
        switch (subcommand) {
            case `track`:
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                interaction.reply("Повторение трека включено");
                break;
            case `queue`:
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                interaction.reply("Повторение очереди включено");
                break;
            case `off`:
                queue.setRepeatMode(QueueRepeatMode.OFF); 
                interaction.reply("Повторение выключено");
                break;
        }
    }
}