const { logger } = require('../logger');
const { db } = require('../db');

module.exports.updateIgnores = async (ignores) => {
  try {
    await db.push(`/ignores`, ignores);
  } catch (error) {
    logger.error(error);
  }
}

module.exports.getAllIgnores = async () => {
  try {
    const ignores = await db.getData("/ignores");
    return ignores;
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
