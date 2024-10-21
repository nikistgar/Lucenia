const { duelembed, duelbutton, duel} = require(process.env.RESOURCE_PATH + '/source/messages')
const { SlashCommandBuilder, ComponentType } = require("discord.js");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('duel')
		.setDescription('Вызвать на дуэль/Вызов самого себя ролит число до 100')
        .addUserOption(option =>
            option
                .setName('opponent')
                .setDescription('Противник')
                .setRequired(true))
        .setDMPermission(false),
	async execute(interaction, client) {
        const opponent = await interaction.options.getUser('opponent');
        const user = interaction?.member?.user;
        const channel = interaction?.channel;
        await client.userJsonCheck(user.id);
        await client.userJsonCheck(opponent.id);

        const reply = await interaction.reply({components:[duel], content: `${user} вызывает на дуэль ${opponent}`})
  
        const duelcollector = reply.createMessageComponentCollector({
            ComponentType: ComponentType.Button,
        });

        if (opponent.bot){
            reply.delete();
            await channel.send("Ну ты и кретин")
        }
    
        function duelfunction(winner, loser){
            r = Math.floor(Math.random() * 10)
            switch(r)
            {
                case 0:
                    channel.send(`${loser} получил окороком по лицу от ${winner}, ${winner} победил`)
                    break
                case 1:
                    channel.send(`${loser} кидает хук в ${winner}, но промахивается, победа за ${winner}`)
                    break
                case 2:
                    channel.send(`${loser} споткнулся об арбуз, ${winner} одержал верх`)
                    break
                case 3:
                    channel.send(`${winner} ультует в ${loser}, побеждая в замесе`)
                    break
                case 4:
                    channel.send(`${loser} не смог прийти на дуэль, победа за ${winner}`)
                    break
                case 5:
                    channel.send(`${loser} сделал неудачное сальто, в этот раз ${winner} повезло`)
                    break
                case 6:
                    channel.send(`${winner} разрезал ${loser} пополам, победа ${winner}`)
                    break
                case 7:
                    channel.send(`${winner} вместо дуэли скинул ядерку на ${loser}, не везёт`)
                    break
                case 8:
                    channel.send(`${winner} разрядил обойму с КАЛАК-12 в ${loser}, ${loser} не выжил`)
                    break
                case 9:
                    channel.send(`${winner} подул на ${loser}, ${loser} решил упасть со скалы`)
                    break
            }
        }

        function duelStats(userID, duelresult) {
            const reader = fs.readFileSync("users/duel_data.json", `utf-8`);
            let obj = JSON.parse(reader);
            {
                if(typeof obj.users[userID] == `undefined`)
                    {
                        if(duelresult == `win`)
                            {
                                obj.users[userID].wins += 1;
                            }
                        else if(duelresult == `lose`)
                            {
                                obj.users[userID].loses += 1;
                            }
                    }
                else if(obj.users[userID].wins != null)
                    {
                        if(duelresult == `win`)
                            {
                                obj.users[userID].wins += 1;
                            }
                        else if(duelresult == `lose`)
                            {
                                obj.users[userID].loses += 1;
                            }
                    }
            }
            fs.writeFileSync('users/duel_data.json', JSON.stringify(obj));
        }

        duelcollector.on('collect', async (interaction) => {
            await interaction.deferUpdate();
            if (interaction.member.user == opponent){
                reply.delete()
                if (user == opponent)
                {
                    r = Math.floor(Math.random() * 100)
                    {
                        channel.send(`В дуэли шизофрений победил ${user} номер ${r}`)
                    }
                }
                else
                {
                    r = Math.floor(Math.random() * 100)
                    
                    if (r < 50){
                        duelStats(opponent.id, `win`);
                        duelStats(user.id, `lose`);
                        duelfunction(opponent, user);
                    }
                    else if(r >= 50){
                        duelStats(user.id, `win`);
                        duelStats(opponent.id, `lose`);
                        duelfunction(user, opponent);
                    }
                }
            }
            
            else{
                await interaction?.followUp({content: `На дуэль может ответить только оппонент`, ephemeral: true});
            }
        }
    );
    }
}