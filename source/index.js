require('dotenv').config();
const { Client, IntentsBitField, Collection, SlashCommandBuilder } = require('discord.js');
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

client.on('guildMemberAdd', member => {
    member.setRoles([process.env.DEFAULT_ROLE]);
    console.log(`${member.displayName} setted to default role`)
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