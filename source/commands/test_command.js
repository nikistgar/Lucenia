const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test_command')
		.setDescription('Что-то делает (dev)')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Сообщение')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, client) {
        if (interaction.user.id != process.env.OWNER_ID)
            {
                return interaction.reply({content: "Команда только для разработчиков", ephemeral: true})
            };

        const reader = fs.readFileSync("users/general.json", `utf-8`);
        let obj = JSON.parse(reader);
        
        user = interaction.user;

        obj.users[interaction.user.id] = user

        fs.writeFileSync('users/general.json', JSON.stringify(obj));

        console.log(obj)

        interaction.reply({content: "Работает", ephemeral: true});
    }
}