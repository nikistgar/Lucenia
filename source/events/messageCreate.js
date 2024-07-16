module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        const img_chan = client.channels.cache.get(process.env.IMAGE_CHANNEL)
        if (message.author.bot)
        {
            console.log(`BOT.` + message.author.displayName + ` - ` + message.content)
        }
        else if(message.channel.id == img_chan)
        {
            if (message.attachments.size == 0)
            {
                message.delete();
                console.log(message.author.displayName + ': ' + message.content + " (was in img channel, deleted)");
            }
            else
            {
                console.log(message.author.displayName + ': ' + message.content);
            }
        }
        else
        {
            console.log(message.author.displayName + ': ' + message.content);
        }

            if (message.content.includes('<@422829728681033739>'))
            {
                message.delete();
                return;
            }
    },
};