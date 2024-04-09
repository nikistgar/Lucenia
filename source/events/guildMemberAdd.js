module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        await client.countChannelFunction(client);
        await member.roles.add(process.env.DEFAULT_ROLE);
        console.log(`${member.displayName} joined server, setted to default role`);
    },
};