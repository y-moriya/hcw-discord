const { logger } = require('../logger');
const { db } = require('../db');
const { supabase_url } = require('../config.json');
const { sendRequestToSupabase } = require('../utils/util');

module.exports.updateIgnores = async (ignores) => {
  try {
    await db.push('/ignores', ignores);
  } catch (error) {
    logger.error(error);
  }
}

module.exports.getAllIgnores = async () => {
  try {
    const res = await sendRequestToSupabase(supabase_url, 'GET', {});
    const json = await res.json();
    logger.info(json.users.length);
    return json.users;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

module.exports.deleteIgnore = async (username) => {
  try {
    const ignores = await this.getAllIgnores();
    await this.updateIgnores(ignores.filter((i) => i !== username));
  } catch (error) {
    logger.error(error);
  }
}

module.exports.addIgnore = async (username) => {
  try {
    const ignores = await this.getAllIgnores();
    ignores.push(username);
    await this.updateIgnores(ignores);
  } catch (error) {
    logger.error(error);
  }
}
