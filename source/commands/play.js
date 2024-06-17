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
        if (!channel) return interaction.reply({content: 'You are not connected to a voice channel!', ephemeral: true}); // make sure we have a voice channel
        const query = interaction.options.getString('query', true); // we need input/query to play

        // let's defer the interaction as things can take time to process
        await interaction.deferReply();

        try {
            const { track } = await player.play(channel, query, {
                nodeOptions: {
                    skipOnNoStream: true,
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction, // we can access this metadata object using queue.metadata later on
                    selfDeaf: true,
                    leaveOnEmpty: true,
                    leaveOnEnd: false
                }
            });

            return interaction.followUp(`**${track.cleanTitle}** enqueued!`);
        } catch (e) {
            // let's return error if something failed
            return interaction.followUp({content: `Something went wrong: ${e}`, ephemeral: true});
        }
    }
}