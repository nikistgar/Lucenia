const { SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wtf')
		.setDescription('wtf')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('message')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
	async execute(interaction, exports, client) {  
        const message = await interaction.options.getString('message');
        const huiny = fs.readFileSync("duel_data.json", `utf-8`);

        const user = interaction?.member?.user;

        const userID = user.id;

        r = Math.floor(Math.random() * 100)
                    
                if (r < 50){
                    //duelfunction(opponent, user)
                    
                    console.log(huiny);
                    
                    let obj = JSON.parse(huiny);
                    console.log(obj)

                    function duelstat(userID, duelresult)
                    {
                        if(obj.users[userID] != null)
                            {
                                obj.users[userID] = {}
                                obj.users[userID].wins = 0;
                                obj.users[userID].looses = 0;
                                if(duelresult == 0)
                                    {
                                        obj.users[userID].wins += 1;
                                    }
                                else if(duelresult == 1)
                                    {
                                        obj.users[userID].looses += 1;
                                    }
                            }
                        else if(obj.users[userID] == userID)
                            {
                                if(duelresult == 0)
                                    {
                                        obj.users[userID].wins += 1;
                                    }
                                else if(duelresult == 1)
                                    {
                                        obj.users[userID].looses += 1;
                                    }
                            }
                    }







                    obj.users[userID] = {};
                    obj.users[userID].wins = r;
                    obj.users[userID].looses = r;

                    //obj.users.Administratorss[userID] = "ssss"

                    await fs.writeFileSync('duel_data.json', JSON.stringify(obj));
                }
                else if(r >= 50){
                    //duelfunction(user, opponent)
                }

        await interaction?.reply({content: `Message sent in ${message}!`, ephemeral: true}).catch(()=>{});
    }
}