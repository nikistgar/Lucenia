require('dotenv').config();
const { AttachmentBuilder, EmbedBuilder, Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, ComponentType, ButtonInteraction } = require('discord.js');
const { schedulepng, day1png, day2png, day3png, day4png, daycpng,
        scheduleembed, day1embed, day2embed, day3embed, day4embed,
        daycembed, day1button, day2button, day3button, day4button, daycbutton,
        schedulebuttons} = require('./messages')

const client = new Client({
 intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
 ]
});
const prefix = '.';

client.on('ready', (c) =>{
    console.log(`${c.user.tag} is online`);
    // client.channels.cache.get('1059499932404433030').send({ embeds: [scheduleembed], components:[schedulebuttons], files: [schedulepng] });
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content !== prefix + 'расписание') return;

    const reply = await message.reply({ embeds: [scheduleembed], components:[schedulebuttons], files: [schedulepng] })

    // const filter = (i) => i.user.id === message.author.id;
    const collector = reply.createMessageComponentCollector({
        ComponentType: ComponentType.Button,
        // filter
    });

    collector.on('collect', async (interaction) => {
        await interaction.deferUpdate();
        if (interaction.customId === 'day1') {
            await interaction.message.edit({ embeds: [day1embed], components:[schedulebuttons], files: [day1png] });
            return;
        }
        if (interaction.customId === 'day2') {
            await interaction.message.edit({ embeds: [day2embed], components:[schedulebuttons], files: [day2png] });
            return;
        }
        if (interaction.customId === 'day3') {
            await interaction.message.edit({ embeds: [day3embed], components:[schedulebuttons], files: [day3png] });
            return;
        }
        if (interaction.customId === 'day4') {
            await interaction.message.edit({ embeds: [day4embed], components:[schedulebuttons], files: [day4png] });
            return;
        }
        if (interaction.customId === 'dayc') {
            await interaction.message.edit({ embeds: [daycembed], components:[schedulebuttons], files: [daycpng] });
            return;
        }
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'schedule') {
    const reply = await interaction.reply({ embeds: [scheduleembed], components:[schedulebuttons], files: [schedulepng] })

      // const filter = (i) => i.user.id === message.author.id;
  
      const collector = reply.createMessageComponentCollector({
          ComponentType: ComponentType.Button,
          // filter
      });
  
      collector.on('collect', async (interaction) => {
          await interaction.deferUpdate();
          if (interaction.customId === 'day1') {
              await interaction.message.edit({ embeds: [day1embed], components:[schedulebuttons], files: [day1png] });
              return;
          }
          if (interaction.customId === 'day2') {
              await interaction.message.edit({ embeds: [day2embed], components:[schedulebuttons], files: [day2png] });
              return;
          }
          if (interaction.customId === 'day3') {
              await interaction.message.edit({ embeds: [day3embed], components:[schedulebuttons], files: [day3png] });
              return;
          }
          if (interaction.customId === 'day4') {
              await interaction.message.edit({ embeds: [day4embed], components:[schedulebuttons], files: [day4png] });
              return;
          }
          if (interaction.customId === 'dayc') {
              await interaction.message.edit({ embeds: [daycembed], components:[schedulebuttons], files: [daycpng] });
              return;
          }
      })
    }
  
    if (interaction.commandName === 'ping') {
      return interaction.reply('Pong!');
    }
  });
    
/* collector.on('end', (Collection) => {
    Collection.forEach((click) => {
        console.log(click.user.id, click.setCustomId)
    })
    let tempembed;
    let tempfile;
    if (Collection.first()?.customId === 'day1')
    {
        tempembed = day1embed;
        tempfile = day1png;
    }
    if (Collection.first()?.customId === 'day2')
    {
        tempembed = day2embed;
        tempfile = day2png;
    }
    if (Collection.first()?.customId === 'day3')
    {
        tempembed = day3embed;
        tempfile = day3png;
    }
    if (Collection.first()?.customId === 'day4')
    {
        tempembed = day4embed;
        tempfile = day4png;
    }
},
async i => {await i.update({embeds: [tempembed], components: [schedulebuttons], files: [tempfile]})}) */

client.on('messageCreate', (message) => {
    console.log(message.content);
    if (message.author.bot) {
        return;
    }
    if (message.content === 'Привет')
    {
        message.reply();
    }
});

client.login(process.env.TOKEN);