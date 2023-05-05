const { tall } = require('tall');
const { createBookmark } = require('../lib/bookmark');
const { myId } = require('../config.json');
const { isTargetMessage }=require('../utils/util.js');

module.exports = {
	name: 'messageCreate',
	async execute(message) {
    if (isTargetMessage(message)) {
      let [title, link] = message.content.split('\n');
      title = title.slice(0, 99);
      const unshortendUrl = await tall(link);

      // create thread
      const thread = await message.channel.threads.create({
        name: title,
        autoArchiveDuration: 60*24,
        reason: 'Needed a separate thread for bookmark'
      });

      thread.members.add(myId);

      // create bookmark
      await createBookmark(unshortendUrl, thread.id);
    }
	},
};
