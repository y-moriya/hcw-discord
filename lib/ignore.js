const { logger } = require('../logger');
const { db } = require('../db');

updateIgnores = async (ignores) => {
  try {
    await db.push(`/ignores`, ignores);
  } catch (error) {
    logger.error(error);
  }
}

module.exports.getAllIgnores = async () => {
  try {
    return await db.getData("/ignores");
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

