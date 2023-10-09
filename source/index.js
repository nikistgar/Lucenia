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
    console.log(`${c.user.tag} is online`);
    primarycronstart(client);
    RegisterClientCommands(client);
});

client.on('messageCreate', (message) => {
    if (message.author.bot)
    {
        console.log('BOT - ' + message.content)
    }
    else
    {
        console.log(message.author.displayName + ': ' + message.content);
    }
});

client.login(process.env.TOKEN);