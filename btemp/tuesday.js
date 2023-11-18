const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { tuesdayembed, tuesdaypng} = require(process.env.RESOURCE_PATH + '/source/messages')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tuesday')
		.setDescription('Set tuesday')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, exports, client) {  
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [tuesdayembed], files: [tuesdaypng] })});
        await interaction?.reply({content: `Setted to tuesday`, ephemeral: true}).catch(()=>{});
    }
}