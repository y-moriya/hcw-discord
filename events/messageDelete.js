const { addIgnore } = require('../lib/ignore');
const { logger } = require('../logger');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
    const interaction = message.interaction;
    if (!message.author || !message.author.username) {
      if (interaction) {
        interaction.reply('message author or user was lost, creating ignore was failed.');
      }
      logger.info('message author or user was lost, creating ignore was failed.');
      return;
    }
    const username = message.author.username;
    await addIgnore(username);
    if (interaction) {
      interaction.reply(`added ${username} to ignore list`);
    }
    logger.info(`update ignores, add: ${username}`);
	},
};
