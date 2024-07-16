// import channel id from config.json
const { channelId } = require('../config.json');

// function to judge message is target
module.exports.isTargetMessage = (message) => {
  if (!message.author) return false;
  if (message.author.username !== 'HCW') return false;
  if (!message.channel) return false;
  if (!message.channel.id) return false;
  if (message.channel.id !== channelId) return false;
  return true;
}
