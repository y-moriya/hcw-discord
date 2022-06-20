const { tall } = require('tall');
const { logger } = require('../logger');
const { createBookmark } = require('../lib/createBookmark');
const { createIgnore } = require('../lib/createIgnore');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
    if (message.member && message.member.roles && message.member.roles.cache.some(role => role.name === 'IFTTT')) {
      const [title, link] = message.content.split('\n');
      const unshortendUrl = await tall(link);

      // create thread
      const thread = await message.channel.threads.create({
        name: title,
        autoArchiveDuration: 60*24,
        reason: 'Needed a separate thread for bookmark'
      });

      // create bookmark on hcw-rails api
      await createBookmark(unshortendUrl, thread.id);

    } else if (message.type === 'REPLY') {
      logger.info(`Message was detected, type: ${message.type}, content: ${message.content}`);
      if (message.content === '/ignore') {
        logger.info('fetch target message from reference message id.');
        const targetMessage = await message.channel.messages.fetch(message.reference.messageId);
        const targetUsername = targetMessage.author.username;

        await createIgnore(targetUsername);
      }
    }
	},
};