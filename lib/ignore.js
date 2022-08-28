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
    const ignoresStr = await db.getData("/ignores");
    const ignoresArray = ignoresStr.split(',');
    return ignoresArray;
  } catch (error) {
    logger.error(error);
    return null;
  }
}
