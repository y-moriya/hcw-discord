const { logger } = require('../logger');
const { db } = require('../db');

module.exports.createBookmark = async (url, thread_id) => {
  try {
    await db.push(`/bookmarks/${thread_id}`, { url: url, thread_id: thread_id, users: [] });
  } catch (error) {
    logger.error(error);
  }
}

module.exports.getAllBookmarks = async () => {
  try {
    return await db.getData("/bookmarks");
  } catch (error) {
    logger.error(error);
    return null;
  }
}

module.exports.updateBookmark = async (bookmark) => {
  try {
    await db.push(`/bookmarks/${bookmark.thread_id}`, bookmark);
  } catch (error) {
    logger.error(error);
  }
}

module.exports.deleteBookmark = async (bookmark) => {
  try {
    await db.delete(`/bookmarks/${bookmark.thread_id}`);
    await db.save();
  } catch (error) {
    logger.error(error);
  }
}
