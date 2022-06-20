const { rails_api_url } = require('../config.json');
const fetch = require('node-fetch');
const { logger } = require('../logger');

module.exports.createBookmark = async (url, thread_id) => {
  const body = JSON.stringify({ "url": url, "thread_id": thread_id });
  const res = await fetch(rails_api_url + 'bookmarks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });
  const status = res.status;
  if (status === 201) {
    logger.info(`create bookmark ${url} was succeeded.`);
  } else {
    logger.info(`create bookmark was failed, status: ${status}`);
  }
}
