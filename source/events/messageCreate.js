module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot)
        {
            console.log(`BOT.` + message.author.displayName + ` - ` + message.content)
        }
        else
        {
            console.log(message.author.displayName + ': ' + message.content);
        }
    },
};