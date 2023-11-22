require('dotenv').config();
const { Client, IntentsBitField, Collection, Guild,  } = require('discord.js');
const { primarycronstart } = require('./cron-times');
const { RegisterClientCommands } = require('./register-commands')

const client = new Client({
 intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildScheduledEvents,
 ]
});

client.commands = new Collection()

client.on('ready', (c) =>{
    primarycronstart(client);
    RegisterClientCommands(client);
    console.log(`${c.user.tag} is online`);
});

client.on('guildMemberAdd', async member => {
    /*const guild = client.guilds.cache.get(process.env.GUILD_ID);
    const roleName = guild.roles.cache.get(process.env.DEFAULT_ROLE).name;
    const roleSize = guild.roles.cache.get(process.env.DEFAULT_ROLE).members.size;*/
    await member.roles.add(process.env.DEFAULT_ROLE);
    console.log(`${member.displayName} setted to default role`);
    //await guild.channels.cache.get(process.env.USER_COUNT_CHANNEL).setName(`${roleName}: ${roleSize}`).then(console.log('channel setted'));
});

client.on('messageCreate', (message) => {
    if (message.author.bot)
    {
        console.log(`BOT.` + message.author.displayName + ` - ` + message.content)
    }
    else
    {
        console.log(message.author.displayName + ': ' + message.content);
    }
});

client.login(process.env.TOKEN);