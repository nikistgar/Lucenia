const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('send')
		.setDescription('1')
        .addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('channel')
				.setRequired(true))
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('message')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, client, message, send, channels, deferUpdate, ComponentType) {
            const channel = await interaction.options.getChannel('channel');
            const messagecon = await interaction.options.getString('message');

            await channel.send(messagecon);

            client.on("interactionCreate", async (i) => {

                return i.deferUpdate()
            }
        )
    }
}