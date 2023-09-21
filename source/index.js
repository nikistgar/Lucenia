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
const prefix = '.';

client.commands = new Collection()

client.on('ready', (c) =>{
    console.log(`${c.user.tag} is online`);
    primarycronstart(client);
    RegisterClientCommands(client);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    switch(message.content) {
        case prefix + 'расписание':
            interaction = message;
            schedule_command(interaction);
    }
})

client.on('messageCreate', (message) => {
    if (message.author.bot)
    {
        console.log('BOT - ' + message.content)
    }
    else
    {
        console.log(message.content);
    }
});

client.login(process.env.TOKEN);