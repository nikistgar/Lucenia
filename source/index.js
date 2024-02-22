const { Client, IntentsBitField, Collection, Guild, GatewayIntentBits } = require('discord.js');
//const { RegisterClientCommands } = require('./register-commands')
const fs = require('fs');
const { primarycronstart } = require('./cron-times');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 

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
    client.login(process.env.TOKEN)
})();

client.on('ready', (c) =>{
    primarycronstart(client);
    //RegisterClientCommands(client);
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