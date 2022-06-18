const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('User info.'),
	async execute(interaction) {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	},
};