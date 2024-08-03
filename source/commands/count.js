const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setDescription('Показывает количество участников с определённой ролью')
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('role')
                .setRequired(true))
    .setDMPermission(false),
	async execute(interaction ) {
        const role = await interaction.options.getRole('role');
        roleName = role.name;
        function getRoleCount(roleName) {
            if (!role) {
              return "Роль не найдена";
            }
            return `Количество участников с ролью ${roleName}: ${role.members.size}`;
          }
          await interaction?.reply({content: `${getRoleCount(roleName)}`, ephemeral: false}).catch(()=>{});
    }
}