const { Client, IntentsBitField, Collection, Guild, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const { Player, useMainPlayer } = require('discord-player');
const { YandexMusicExtractor } = require("discord-player-yandexmusic");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates] }); 

//music
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
});

async function loadExtractors(player) {
    client.player.extractors.register(YandexMusicExtractor, { access_token: `${process.env.YANDEX_TOKEN}`, uid: `${process.env.YANDEX_UID}` })
    await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');
}

client.player.events.on('playerStart', (queue, track) => {
    queue.metadata.channel.send(`Started playing **${track.cleanTitle}**!`);
});
//music

client.commands = new Collection();

require('dotenv').config();

const functions = fs.readdirSync("./source/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./source/events").filter(file => file.endsWith(".js"));
const commandFiles = fs.readdirSync("./source/commands").filter(file => file.endsWith(".js"));

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./source/events");
    client.handleCommands(commandFiles, "./source/commands");
    client.cronTimes(client);
    loadExtractors(client.player);
    client.login(process.env.TOKEN)
})();

//1671825151