const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('duel_stats')
		.setDescription('Статистика дуэлей')
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('user')
				.setRequired(true))
		.setDMPermission(false),
	async execute(interaction, exports, client) {  
        const userID = await interaction.options.getUser('user').id;
        const reader = fs.readFileSync("duel_data.json", `utf-8`);
        let obj = JSON.parse(reader);

        if(typeof obj.users[userID] == "undefined")
            {
                interaction.reply(`Пользователь не участвовал в дуэлях`)
            }
        else if(obj.users[userID].wins != null)
            {
                interaction.reply(`Победы ${obj.users[userID].wins}/Поражения ${obj.users[userID].loses}`)
            }
        
    }
}