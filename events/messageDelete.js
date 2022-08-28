const { getAllIgnores, updateIgnores } = require('../lib/ignore');
const { logger } = require('../logger');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
    if (!message.author || !message.author.username) {
      logger.info('message author or user was lost, creating ignore was failed.');
      return;
    }
    const username = message.author.username;
    const ignores = await getAllIgnores();
    ignores.push(username);
    await updateIgnores(ignores);
    logger.info(`update ignores, add: ${username}`);
	},
};