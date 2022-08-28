const { SlashCommandBuilder } = require('@discordjs/builders');
const { getAllIgnores, updateIgnores } = require('../lib/ignore');
const { logger } = require('../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ignore')
		.setDescription('Add ignore user to database')
		.addStringOption(option => option.setName('input').setDescription('Enter a ignore username')),
	async execute(interaction) {
		const username = interaction.options.getString('input');
		const ignores = await getAllIgnores();
		ignores.push(username);
		await updateIgnores(ignores);
    logger.info(`update ignores from command, add: ${username}`);
	},
};