const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates] }); 

client.commands = new Collection();

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
    client.music(client);
    client.login(process.env.TOKEN)
})();