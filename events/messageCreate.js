const { tall } = require('tall');
const { createBookmark } = require('../lib/createBookmark');
const { myId } = require('../config.json');

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

      thread.members.add(myId);

      // create bookmark on hcw-rails api
      await createBookmark(unshortendUrl, thread.id);
    }
	},
};