const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js');
const { avatarembed } = require(process.env.RESOURCE_PATH + '/source/messages')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Выводит аватар пользователя')
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('Пользователь')
				.setRequired(true))
		.setDMPermission(false),
	async execute(interaction, exports, client) {  
            const user = await interaction.options.getUser('user');
            const avatarembed = new EmbedBuilder()
                .setTitle(`Аватар ${user.tag}`)
                .setImage(`${user.displayAvatarURL({ size: 4096, dynamic: true })}`);
            await interaction?.reply({embeds: [avatarembed]}).catch(()=>{});
            
    }
}