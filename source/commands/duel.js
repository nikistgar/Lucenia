const { duelembed, duelbutton, duel} = require(process.env.RESOURCE_PATH + '/source/messages')
const { SlashCommandBuilder, ComponentType } = require("discord.js");
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('duel')
		.setDescription('duel')
        .addUserOption(option =>
            option
                .setName('opponent')
                .setDescription('opponent')
                .setRequired(true)),
	async execute(interaction, client) {
        const opponent = await interaction.options.getUser('opponent');
        const user = interaction?.member?.user;
        const channel = interaction?.channel;

        const reply = await interaction.reply({components:[duel], content: `${user} вызывает на дуэль ${opponent}`})
  
        const collector = reply.createMessageComponentCollector({
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
                    channel.send(`${winner} ультует в ${loser}, побеждая в замесе`)
                    break
                case 1:
                    channel.send(`${loser} кидает хук в ${winner}, но промахивается, победа за ${winner}`)
                    break
                case 2:
                    channel.send(`${winner} разрядил обойму с КАЛАК-12 в ${loser}, ${loser} не выжил`)
                    break
                case 3:
                    channel.send(`${winner} ультует в ${loser}, побеждая в замесе`)
                    break
                case 4:
                    channel.send(`${loser} кидает хук в ${winner}, но промахивается, победа за ${winner}`)
                    break
                case 5:
                    channel.send(`${winner} разрядил обойму с КАЛАК-12 в ${loser}, ${loser} не выжил`)
                    break
                case 6:
                    channel.send(`${loser} кидает хук в ${winner}, но промахивается, победа за ${winner}`)
                    break
                case 7:
                    channel.send(`${winner} ультует в ${loser}, побеждая в замесе`)
                    break
                case 8:
                    channel.send(`${winner} разрядил обойму с КАЛАК-12 в ${loser}, ${loser} не выжил`)
                    break
                case 9:
                    channel.send(`${winner} ультует в ${loser}, побеждая в замесе`)
                    break
            }
        }

        function duelStats(userID, duelresult) {
            const reader = fs.readFileSync("duel_data.json", `utf-8`);
            let obj = JSON.parse(reader);
            {
                if(typeof obj.users[userID] == `undefined`)
                    {
                        obj.users[userID] = {}
                        obj.users[userID].wins = 0;
                        obj.users[userID].loses = 0;
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
            fs.writeFileSync('duel_data.json', JSON.stringify(obj));
        }

        collector.on('collect', async (interaction) => {
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