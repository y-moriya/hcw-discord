const { tall } = require('tall');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
		const { logger } = require('../logger');
    if (message.member.roles.cache.some(role => role.name === 'IFTTT')) {
      const [title, link] = message.content.split('\n');
      const unshortendUrl = await tall(link);
      // message.channel.send(`title: ${title}, unshortendUrl: ${unshortendUrl}`);

      // TODO: create thread

      // TODO: create bookmark on hcw-rails api

      // TODO: send registerd message
    } else if (message.type === 'REPLY') {
      logger.info(`Message was detected, type: ${message.type}, content: ${message.content}`);
      if (message.content === '/ignore') {
        logger.info('fetch target message from reference message id.');
        const targetMessage = await message.channel.messages.fetch(message.reference.messageId);
        const targetUsername = targetMessage.author.username;

        // TODO: post target username to hcw-rails api
      }
    }
	},
};