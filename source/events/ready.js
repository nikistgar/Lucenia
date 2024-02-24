module.exports = {
    name: 'ready',
    async execute(client) {
        client.countChannelFunction(client);
        console.log(`${client.user.tag} is online`);
    },
};