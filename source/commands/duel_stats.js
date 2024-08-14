const { SlashCommandBuilder } = require('discord.js');
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
		.setDMPermission(true),
	async execute(interaction) {  
        const userID = await interaction.options.getUser('user').id;
        const reader = fs.readFileSync("users/duel_data.json", `utf-8`);
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