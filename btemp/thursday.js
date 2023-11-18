const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { thursdayembed, thursdaypng} = require(process.env.RESOURCE_PATH + '/source/messages')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('thursday')
		.setDescription('Set thursday')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, exports, client) {  
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [thursdayembed], files: [thursdaypng] })});
        await interaction?.reply({content: `Setted to thursday`, ephemeral: true}).catch(()=>{});
    }
}