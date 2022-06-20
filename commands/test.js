const { SlashCommandBuilder } = require('@discordjs/builders');
const { createBookmark } = require('../lib/createBookmark');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Command Test'),
	async execute(interaction) {
    const title = 'Google';
    const url = 'https://www.google.com/';

		// create thread
		const thread = await interaction.channel.threads.create({
			name: title,
			autoArchiveDuration: 60,
			reason: 'Needed a separate thread for bookmark'
		});

		// create bookmark on hcw-rails api
		await createBookmark(url, thread.id);

		// send registerd message
    interaction.reply('thread create succeeded.')
	},
};