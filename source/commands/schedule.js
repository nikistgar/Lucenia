const { schedulepng, day1png, day2png, day3png, day4png, daycpng,
    scheduleembed, day1embed, day2embed, day3embed, day4embed,
    daycembed, gymschedule, gymschedule2} = require(process.env.RESOURCE_PATH + '/source/messages')
const { SlashCommandBuilder, ComponentType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('schedule')
		.setDescription('Расписание'),
	async execute(interaction, exports) {
		const reply = await interaction.reply({ embeds: [scheduleembed], components:[gymschedule, gymschedule2], files: [schedulepng] })
  
      const collector = reply.createMessageComponentCollector({
          ComponentType: ComponentType.Button,
      });
  
      collector.on('collect', async (interaction) => {
          await interaction.deferUpdate();
          switch(interaction.customId){
            case 'day1':
                await interaction.message.edit({ embeds: [day1embed], components:[gymschedule, gymschedule2], files: [day1png] });
                return;
            case 'day2':
                await interaction.message.edit({ embeds: [day2embed], components:[gymschedule, gymschedule2], files: [day2png] });
                return;
            case 'day3':
                await interaction.message.edit({ embeds: [day3embed], components:[gymschedule, gymschedule2], files: [day3png] });
                return;
            case 'day4':
                await interaction.message.edit({ embeds: [day4embed], components:[gymschedule, gymschedule2], files: [day4png] });
                return;
            case 'dayc':
                await interaction.message.edit({ embeds: [daycembed], components:[gymschedule, gymschedule2], files: [daycpng] });
                return;
            case 'schedule':
                await interaction.message.edit({ embeds: [scheduleembed], components:[gymschedule, gymschedule2], files: [schedulepng] });
                return;
	}
}
      )
}
}