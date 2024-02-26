module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.countChannelFunction(client);
        console.log(`${client.user.tag} is online`);
    },
};