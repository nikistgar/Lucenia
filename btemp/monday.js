const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { mondayembed, mondaypng} = require(process.env.RESOURCE_PATH + '/source/messages')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('monday')
		.setDescription('Set monday')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, exports, client) {  
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [mondayembed], files: [mondaypng] })});
        await interaction?.reply({content: `Setted to monday`, ephemeral: true}).catch(()=>{});
    }
}