const { schedulepng, day1png, day2png, day3png, day4png, daycpng,
    scheduleembed, day1embed, day2embed, day3embed, day4embed,
    daycembed, gymschedule, gymschedule2} = require(process.env.RESOURCE_PATH + '/source/messages')
const { SlashCommandBuilder, ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gym')
		.setDescription('Расписание качалки')
        .setDMPermission(true),
	async execute(interaction) {
		const reply = await interaction.reply({ embeds: [scheduleembed], components:[gymschedule, gymschedule2], files: [schedulepng] })
  
      const collector = reply.createMessageComponentCollector({
          ComponentType: ComponentType.Button,
      });
  
      collector.on('collect', async (interaction) => {
          await interaction.deferUpdate();
          await interaction.message.edit({ embeds: [eval(interaction.customId + "embed")], components:[gymschedule, gymschedule2], files: [eval(interaction.customId + "png")]});
	        }
        )
    }
}