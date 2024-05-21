require('dotenv').config();
module.exports = (client) => {
    client.devCheck = async () => {
        eval(`if (interaction.user.id != process.env.OWNER_ID)
            {
                return interaction.reply("Команда только для разработчиков")
            }`)
    }
}