const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bot_avatar")
        .setDescription(`Меняет аватар бота (dev)`)
        .addAttachmentOption(option => option.setName("avatar").setDescription("Выбор аватарки").setRequired(true)),
    async execute (interaction, client) { 
        if (interaction.user.id != process.env.OWNER_ID)
            {
                return interaction.reply({content: "Команда только для разработчиков", ephemeral: true})
            }

        const { options } = interaction;
        const avatar = options.getAttachment('avatar')

        options.getAttachment("avatar");
        async function sendMessage (message) {
            const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setDescription(message);

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (avatar.contentType !== "image/gif") return await sendMessage("Please use a gif format for animated emojis");

        var error;
        await client.user.setAvatar(avatar.url).catch(async err => {
            error = true;
            console.log(err);
            return await sendMessage(`Error: \`${err.toString()}\``);
        }); 

        if (error) return;
        await interaction?.reply({content: `???`, ephemeral: true}).catch(()=>{});
        await sendMessage(`I have uploaded your avatar`)
    }
}