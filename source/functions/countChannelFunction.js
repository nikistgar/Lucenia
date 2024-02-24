require('dotenv').config();
module.exports = (client) => {
    client.countChannelFunction = async (client) => {
        const guild = client.guilds.cache.get(process.env.GUILD_ID);
        const roleName = guild.roles.cache.get(process.env.DEFAULT_ROLE).name;
        const roleSize = guild.roles.cache.get(process.env.DEFAULT_ROLE).members.size;
        guild.channels.cache.get(process.env.USER_COUNT_CHANNEL).setName(`${roleName}: ${roleSize}`).then(console.log('channel setted'));
    }
}