const { AttachmentBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');


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

module.exports = { schedulepng, day1png, day2png, day3png, day4png, daycpng,
                   scheduleembed, day1embed, day2embed, day3embed, day4embed,
                   daycembed, day1button, day2button, day3button, day4button, daycbutton,
                   schedulebuttons};