const { SlashCommandBuilder, ComponentType } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Расписание качалки')
        .setDMPermission(true)
        .addStringOption(option =>
            option
                .setName('query')
                .setDescription('музыка')
                .setRequired(true)),
	async execute(interaction, client ) {
		const player = useMainPlayer();
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply({content: 'You are not connected to a voice channel!', ephemeral: true});
        const query = interaction.options.getString('query', true);

        await interaction.deferReply();

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    skipOnNoStream: true,
                    metadata: interaction,
                    selfDeaf: true,
                    leaveOnEmpty: true,
                    leaveOnEnd: true
                }
            });

            return interaction.followUp(`**${track.cleanTitle}** enqueued!`);
        } catch (e) {
            return interaction.followUp({content: `Something went wrong: ${e}`, ephemeral: true});
        }
    }
}