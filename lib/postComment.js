
const fetch = require('node-fetch');
const { discord_webhook_url } = require('../config.json');
const { logger } = require('../logger');

module.exports.postComment = async (comment, thread_id) => {
  const params = { thread_id: thread_id };
  const query_params = new URLSearchParams(params);
  const url = discord_webhook_url + '?' + query_params;
  const body = JSON.stringify({
    "username": comment.username,
    "avatar_url": comment.avatar_url,
    "content": comment.comment_content
  });
  logger.info(`send discord, body: ${body}, url: ${url}`);
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });
  const status = res.status;
  if (status === 204) {
    logger.info(`post to discord ${comment.permalink} was succeeded.`);
  } else {
    logger.error(`post to discord ${comment.permalink} was failed, status: ${status}`);
  }
}