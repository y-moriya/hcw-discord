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
