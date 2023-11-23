const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('count')
		.setDescription('count')
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('role')
                .setRequired(true)),
	async execute(interaction) {
        const role = await interaction.options.getRole('role');
        roleName = role.name;
        function getRoleCount(roleName) {
            if (!role) {
              return "Роль не найдена";
            }
            const membersWithRole = role.members;
            return `Количество участников с ролью ${roleName}: ${membersWithRole.size}`;
          }
          await interaction?.reply({content: `${getRoleCount(roleName)}`, ephemeral: true}).catch(()=>{});
    }
}