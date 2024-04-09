module.exports = {
    name: 'guildMemberRemove',
    async execute(member, client) {
        await client.countChannelFunction(client);
        console.log(`${member.displayName} has left the server`);
    },
};