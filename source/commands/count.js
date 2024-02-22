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
	async execute(interaction, message, client) {
        const role = await interaction.options.getRole('role');
        const guild = await client.guilds.fetch(1025479339455819826);
        const members = await guild.members.fetch();
        roleName = role.name;
        function getRoleCount(roleName) {
            if (!role) {
              return "Роль не найдена";
            }
            const membersWithRole = members.roles.get(role).members.size;
            return `Количество участников с ролью ${roleName}: ${membersWithRole.size}`;
          }
          await interaction?.reply({content: `${getRoleCount(roleName)}`, ephemeral: true}).catch(()=>{});
          await interaction?.reply({content: `${membersWithRole}`, ephemeral: true}).catch(()=>{});
    }
}