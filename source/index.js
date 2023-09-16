require('dotenv').config();
const { AttachmentBuilder, EmbedBuilder, Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, ComponentType, ButtonInteraction } = require('discord.js');
//
const client = new Client({
 intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
 ]
});
const prefix = '.';
const schedulepng = new AttachmentBuilder('./assets/schedule.png')
const day1png = new AttachmentBuilder('./assets/day1.png');
const day2png = new AttachmentBuilder('./assets/day2.png');
const day3png = new AttachmentBuilder('./assets/day3.png');
const day4png = new AttachmentBuilder('./assets/day4.png');
const daycpng = new AttachmentBuilder('./assets/dayc.png');

const scheduleembed = new EmbedBuilder()
	.setTitle('Schedule')
	.setImage('attachment://schedule.png');

const day1embed = new EmbedBuilder()
	.setTitle('Day 1')
	.setImage('attachment://day1.png');

const day2embed = new EmbedBuilder()
	.setTitle('Day 2')
	.setImage('attachment://day2.png');

const day3embed = new EmbedBuilder()
	.setTitle('Day 3')
	.setImage('attachment://day3.png');

const day4embed = new EmbedBuilder()
	.setTitle('Day 4')
	.setImage('attachment://day4.png');

const daycembed = new EmbedBuilder()
	.setTitle('Day C')
	.setImage('attachment://dayc.png');

const day1button = new ButtonBuilder()
    .setCustomId('day1')
    .setLabel('Day 1')
    .setStyle(ButtonStyle.Primary);

const day2button = new ButtonBuilder()
    .setCustomId('day2')
    .setLabel('Day 2')
    .setStyle(ButtonStyle.Primary);

const day3button = new ButtonBuilder()
    .setCustomId('day3')
    .setLabel('Day 3')
    .setStyle(ButtonStyle.Primary);

const day4button = new ButtonBuilder()
    .setCustomId('day4')
    .setLabel('Day 4')
    .setStyle(ButtonStyle.Primary);

const daycbutton = new ButtonBuilder()
    .setCustomId('dayc')
    .setLabel('Day C')
    .setStyle(ButtonStyle.Primary);

const schedulebuttons = new ActionRowBuilder()
.addComponents(day1button, day2button, day3button, day4button, daycbutton);

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