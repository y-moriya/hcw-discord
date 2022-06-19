const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Command Test'),
	async execute(interaction) {
    const title = 'Google';
    const url = 'https://www.google.com/';
	},
};