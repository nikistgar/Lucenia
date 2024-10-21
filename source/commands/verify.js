const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Подтвердить пользователя')
        .setDMPermission(true)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Пользователь')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {
        const guild = interaction.guild;
        const user = await guild.members.cache.get(interaction.options.getUser('user').id);
        await user.roles.add(process.env.VERIFIED_ROLE);
        await interaction?.reply({content: `Роль выдана`, ephemeral: true}).catch(()=>{});
    }
}