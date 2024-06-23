module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        await member.roles.add(process.env.DEFAULT_ROLE);
        await client.countChannelFunction(client);
        console.log(`${member.displayName} joined server, setted to default role`);
    },
};