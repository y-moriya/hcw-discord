const { createIgnore } = require('../lib/createIgnore');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
    const { logger } = require('../logger');
    if (!message.author || !message.author.username) {
      logger.info('message author or user was lost, creating ignore was failed.');
      return;
    }
    const username = message.author.username;
    const result = await createIgnore(username);
    if (!result) {
      logger.error(`Creating ignore was failed, usename: ${username}`);
      await message.channel.send(`Creating ignore was failed, usename: ${username}`);
    }
	},
};