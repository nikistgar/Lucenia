require('dotenv').config();
const { Client, IntentsBitField, Collection, SlashCommandBuilder } = require('discord.js');
//const { schedule_command } = require('./commands');
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

/*client.on('messageCreate', async (message) => {
    if (message.author.id === '418792454922305557')
    {
        if (message.content.includes('размут'))
        {
            message.delete();
            return;
        }
        if (message.content.includes('раз'))
        {
            message.delete();
            return;
        }
        if (message.content.includes('мут'))
        {
            message.delete();
            return;
        }
        if (message.content.includes('<@422829728681033739>'))
        {
            message.delete();
            return;
        }
    }
})*/

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    switch(message.content) {
        case prefix + 'расписание':
            interaction = message;
            schedule_command(interaction);
        /*case prefix + 'send':
            if (message.author.id == '422829728681033739')
        {
            const messagecont = message.content;
            client.channels.cache.get('1153261980656865340').send(messagecont);
        }*/
    }
})

/*client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
  
    switch (interaction.commandName) {
        case 'schedule':
            schedule_command(interaction);
        case 'startgym':
            /*console.log('wtf1');

        const event_manager = new GuildScheduledEventManager(process.env.GUILD_ID);

        console.log('wtf2');

        await event_manager.create({
            name: 'Качалка',
            scheduledStartTime: new Date(1894910999),
            privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
            entityType: GuildScheduledEventEntityType.Voice,
            description: 'This is a test Scheduled Event',
            channel: '1025479339900403865',
            image: null,
            reason: 'Testing with creating a Scheduled Event',
    })
    }
  }
);*/
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