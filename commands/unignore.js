const { SlashCommandBuilder } = require('@discordjs/builders');
const { getAllIgnores, updateIgnores, deleteIgnore } = require('../lib/ignore');
const { logger } = require('../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unignore')
		.setDescription('Delete ignore user from database')
		.addStringOption(option => option.setName('input').setDescription('Enter a un-ignore username')),
	async execute(interaction) {
		const username = interaction.options.getString('input');
		await deleteIgnore(username);
    logger.info(`update ignores from command, delete: ${username}`);
		await interaction.reply(`${username} を非表示リストから削除しました。`);
	},
};