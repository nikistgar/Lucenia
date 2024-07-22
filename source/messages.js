const { AttachmentBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

const kachpng = new AttachmentBuilder('./assets/gym/Gigachad.png')
const schedulepng = new AttachmentBuilder('./assets/gym/schedule.png')
const day1png = new AttachmentBuilder('./assets/gym/day1.png');
const day2png = new AttachmentBuilder('./assets/gym/day2.png');
const day3png = new AttachmentBuilder('./assets/gym/day3.png');
const day4png = new AttachmentBuilder('./assets/gym/day4.png');
const daycpng = new AttachmentBuilder('./assets/gym/dayc.png');

const mondaypng = new AttachmentBuilder('./assets/sc/monday.png')
const tuesdaypng = new AttachmentBuilder('./assets/sc/tuesday.png')
const wednesdaypng = new AttachmentBuilder('./assets/sc/wednesday.png')
const thursdaypng = new AttachmentBuilder('./assets/sc/thursday.png')
const fridaypng = new AttachmentBuilder('./assets/sc/friday.png')

const kachembed = new EmbedBuilder()
    .setDescription('Сегодня качаемся ребята')
	.setTitle('Качалка')
	.setImage('attachment://Gigachad.png');

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

const mondayembed = new EmbedBuilder()
	.setTitle('Понедельник')
	.setImage('attachment://monday.png');

const tuesdayembed = new EmbedBuilder()
	.setTitle('Вторник')
	.setImage('attachment://tuesday.png');

const wednesdayembed = new EmbedBuilder()
	.setTitle('Среда')
	.setImage('attachment://wednesday.png');

const thursdayembed = new EmbedBuilder()
	.setTitle('Четверг')
	.setImage('attachment://thursday.png');

const fridayembed = new EmbedBuilder()
	.setTitle('Пятница')
	.setImage('attachment://friday.png');

const duelembed = new EmbedBuilder()
    .setTitle('Дуэль')

const musicembed = new EmbedBuilder()
    .setTitle('Музыка')

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

const schedulebutton = new ButtonBuilder()
    .setCustomId('schedule')
    .setLabel('Schedule')
    .setStyle(ButtonStyle.Success);

const duelbutton = new ButtonBuilder()
    .setCustomId('duel')
    .setLabel('Принять')
    .setStyle(ButtonStyle.Success);

const pause = new ButtonBuilder()
    .setCustomId('pause')
    .setLabel('⏸︎')
    .setStyle(ButtonStyle.Success);

const resume = new ButtonBuilder()
    .setCustomId('resume')
    .setLabel('⏵︎')
    .setStyle(ButtonStyle.Success);

const skip = new ButtonBuilder()
    .setCustomId('skip')
    .setLabel('⏭︎')
    .setStyle(ButtonStyle.Success);

const gymschedule = new ActionRowBuilder()
    .addComponents(day1button, day2button, day3button, day4button, daycbutton);

const gymschedule2 = new ActionRowBuilder()
    .addComponents(schedulebutton);

const duel = new ActionRowBuilder()
    .addComponents(duelbutton);

const music = new ActionRowBuilder()
    .addComponents(pause, resume, skip);

module.exports = { schedulepng, day1png, day2png, day3png, day4png, daycpng,
                   scheduleembed, day1embed, day2embed, day3embed, day4embed,
                   daycembed, day1button, day2button, day3button, day4button, daycbutton,
                   gymschedule, gymschedule2, kachembed, kachpng, schedulebutton,
                   mondayembed, mondaypng, tuesdayembed, tuesdaypng, wednesdayembed,
                   wednesdaypng, thursdayembed, thursdaypng, fridayembed, fridaypng,
                   duelbutton, duelembed, duel, musicembed, music, pause, resume, skip };