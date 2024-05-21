const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const { mondayembed, mondaypng,
        tuesdayembed, tuesdaypng, 
        wednesdayembed, wednesdaypng, 
        thursdayembed, thursdaypng, 
        fridayembed, fridaypng } = require(process.env.RESOURCE_PATH + '/source/messages')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')
		.setDescription('Расписание (dev)')
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
		.setDMPermission(false),
    async execute(interaction, client) {
        if (interaction.user.id != process.env.OWNER_ID)
            {
                return interaction.reply({content: "Команда только для разработчиков", ephemaral: true})
            }
        const day = await interaction.options.getString('day');
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [eval(day + "embed")], files: [eval(day + "png")] })});
        await interaction?.reply({content: `Setted to ${day}`, ephemeral: true}).catch(()=>{});
    }
}