const { SlashCommandBuilder } = require('@discordjs/builders');
const { addIgnore } = require('../lib/ignore');
const { logger } = require('../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ignore')
		.setDescription('Add ignore user to database')
		.addStringOption(option => option.setName('input').setDescription('Enter a ignore username')),
	async execute(interaction) {
		const username = interaction.options.getString('input');
		await addIgnore(username);
    logger.info(`update ignores from command, add: ${username}`);
		await interaction.reply(`${username} を非表示リストに追加しました。`);
	},
};