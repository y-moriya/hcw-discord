// import channel id from config.json
const { channelId, supabase_service_key } = require('../config.json');

// function to judge message is target
module.exports.isTargetMessage = (message) => {
  if (!message.author) return false;
  if (message.author.username !== 'HCW') return false;
  if (!message.channel) return false;
  if (!message.channel.id) return false;
  if (message.channel.id !== channelId) return false;
  return true;
}

module.exports.sendRequestToSupabase = async (
  url,
  method,
  body,
) => {
  return await fetch(
    url,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabase_service_key}`,
      },
      body: JSON.stringify(body),
    },
  );
}
