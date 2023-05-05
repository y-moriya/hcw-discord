// import channel id from config.json
const { channelId } = require('../config.json');

// function to judge message is target
module.exports.isTargetMessage = (message) => {
  if (!message.member) return false;
  if (!message.member.roles) return false;
  if (!message.member.roles.cache) return false;
  if (!message.member.roles.cache.some(role => role.name === 'IFTTT')) return false;
  if (!message.channel) return false;
  if (!message.channel.id) return false;
  if (message.channel.id !== channelId) return false;
  return true;
}
