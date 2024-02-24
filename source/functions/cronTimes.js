require('dotenv').config();
const CronJob = require('cron').CronJob;

const { mondayembed, mondaypng, tuesdayembed, tuesdaypng,
        wednesdayembed, wednesdaypng, thursdayembed, thursdaypng,
        fridayembed, fridaypng, kachembed, kachpng} = require('../messages')

module.exports = (client) => {
    client.cronTimes = async (eventFiles, path) => {
    console.log('Cron detected');
    const monday = new CronJob ('0 0 0/1 * * 1', async function(monday) {
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [mondayembed], files: [mondaypng] })});
    },
        null,
        true,
        "Europe/Moscow");


    const tuesday = new CronJob ('0 0 0/1 * * 2', async function(tuesday) {
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [tuesdayembed], files: [tuesdaypng] })});
    },
        null,
        true,
        "Europe/Moscow");

    const wednesday = new CronJob ('0 0 0/1 * * 3', async function(wednesday) {
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [wednesdayembed], files: [wednesdaypng] })});
    },
        null,
        true,
        "Europe/Moscow");

    const thursday = new CronJob ('0 0 0/1 * * 4', async function(thursday) {
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [thursdayembed], files: [thursdaypng] })});
    },
        null,
        true,
        "Europe/Moscow");

    const friday = new CronJob ('0 0 0/1 * * 5', async function(friday) {
        await client.channels.cache.get(process.env.SC_SCHEDULE_CHANNEL).messages.fetch(process.env.SC_SCHEDULE_MESSAGE)
        .then(message =>{message.edit({ embeds: [fridayembed], files: [fridaypng] })});
    },
        null,
        true,
        "Europe/Moscow");

    const job = new CronJob('0 0 0 2/2 * *', function(gymcron) {
            client.channels.cache.get(process.env.PRIMARY_CHANNEL)
            .send({ embeds: [kachembed], files: [kachpng] });
        },
            null,
            true,
            "Europe/Moscow");
    
    console.log('Cron started')
}}
