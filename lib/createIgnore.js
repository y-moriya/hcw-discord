const { rails_api_url } = require('../config.json');
const fetch = require('node-fetch');
const { logger } = require('../logger');

module.exports.createIgnore = async (username) => {
  const body = JSON.stringify({ "ignores": [username]});
  const res = await fetch(rails_api_url + 'ignores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });
  const status = res.status;
  if (status === 200) {
    logger.info(`create ignore ${username} was succeeded.`);
  } else {
    logger.info(`create ignore was failed, status: ${status}`);
  }
}
