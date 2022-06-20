const { createIgnore } = require('../lib/createIgnore');

module.exports = {
	name: 'messageDelete',
	async execute(message) {
    const username = message.author.username;
    const result = await createIgnore(username);
    if (result) {
      message.channel.send(`Creating ignore was succeeded, usename: ${username}`);
    } else {
      message.channel.send(`Creating ignore was failed, usename: ${username}`);
    }
	},
};