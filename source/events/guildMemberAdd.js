module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        client.countChannelFunction(client);
        await member.roles.add(process.env.DEFAULT_ROLE);
        console.log(`${member.displayName} setted to default role`);
    },
};