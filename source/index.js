require('dotenv').config();
const CronJob = require('cron').CronJob;
const { Client, IntentsBitField } = require('discord.js');
const { kachembed, kachpng} = require('./messages');
const { schedule_command } = require('./commands');

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

client.on('ready', (c) =>{
    console.log(`${c.user.tag} is online`);
    client.channels.cache.get('1025485510627561523').send(`${c.user.tag} is online`)
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

    if (message.content == prefix + 'расписание') {
        interaction = message;
        schedule_command(interaction);
    }
    // const filter = (i) => i.user.id === message.author.id;
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content !== prefix + 'расписание') return;
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'schedule') {
        schedule_command(interaction);
    }

    if (interaction.commandName === 'startgym') {
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
    })*/
  };
});
client.on('messageCreate', (message) => {
    console.log(message.content);
});

console.log('Cron detected');
const job = new CronJob('0 0 0 2/2 * *', function() {
	const d = new Date() + ". ";
	console.log(d);
    client.channels.cache.get('1025479339900403864').send({ embeds: [kachembed], files: [kachpng] });
},
    null,
    true,
    "Europe/Moscow");
console.log('Cron started');
job.start();

client.login(process.env.TOKEN);