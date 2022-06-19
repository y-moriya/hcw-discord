module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const { logger } = require('../logger');
		logger.info(`Ready! Logged in as ${client.user.tag}`);
	},
};