const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { mondayembed, mondaypng,
        tuesdayembed, tuesdaypng, 
        wednesdayembed, wednesdaypng, 
        thursdayembed, thursdaypng, 
        fridayembed, fridaypng } = require(process.env.RESOURCE_PATH + '/source/messages')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')
		.setDescription('schedule')
        .addStringOption(option =>
            option
                .setName('day')
                .setDescription('day')
                .setRequired(true)
                .addChoices(
                    { name: 'monday', value: 'monday' },
                    { name: 'tuesday', value: 'tuesday' },
                    { name: 'wednesday', value: 'wednesday' },
                    { name: 'thursday', value: 'thursday' },
                    { name: 'friday', value: 'friday' },
                ))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
    async execute(interaction, exports, client) {  
        const day = await interaction.options.getString('day');
        const embed = day + "embed";
        const png = day + "png";
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [eval(embed)], files: [eval(png)] })});
        await interaction?.reply({content: `Setted to ${day}`, ephemeral: true}).catch(()=>{});
    }
}