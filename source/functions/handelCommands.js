const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = process.env.CLIENT_ID; 
const guildId = process.env.GUILD_ID; 

module.exports = (client) => {
    client.handleCommands = async (commandFiles, path) => {
        const commands_list = [];
        client.commandArray = [];
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            client.commands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
            commands_list.push(command.data.name);
        }
        
        console.log("Commands registred:", commands_list.toString());

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(clientId), {
                        body: client.commandArray
                    },
                );
                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};