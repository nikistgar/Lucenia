const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { fridayembed, fridaypng} = require(process.env.RESOURCE_PATH + '/source/messages')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('friday')
		.setDescription('Set friday')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, exports, client) {  
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [fridayembed], files: [fridaypng] })});
        await interaction?.reply({content: `Setted to friday`, ephemeral: true}).catch(()=>{});
    }
}