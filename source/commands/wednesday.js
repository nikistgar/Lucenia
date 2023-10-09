const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { wednesdayembed, wednesdaypng} = require(process.env.RESOURCE_PATH + '/source/messages')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wednesday')
		.setDescription('Set wednesday')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, exports, client) {  
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [wednesdayembed], files: [wednesdaypng] })});
        await interaction?.reply({content: `Setted to wednesday`, ephemeral: true}).catch(()=>{});
    }
}