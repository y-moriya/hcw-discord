const { hatebu_url } = require('../config.json');
const fetch = require('node-fetch');
const { logger } = require('../logger');
const cheerio = require('cheerio');
const { _sleep } = require('./_sleep');

const getBookmarkUrl = (url) => {
  const m = url.match(/http(s?):\/\/(.+)/);
  if (m[1] === 's') {
    return `${hatebu_url}/entry/s/${m[2]}`;
  } else {
    return `${hatebu_url}/entry/${m[2]}`;
  }
}

module.exports.getComment = async (bookmark, ignores) => {
  const url = getBookmarkUrl(bookmark.url);
  bookmark.b_url = url;
  logger.info(`start getComment: ${url}`);
  const response = await fetch(url);
  const body = await response.text();
  const $ = cheerio.load(body);
  const comments = $('.entry-comment-contents');
  logger.info(`There are ${comments.length} comments (including duplicate)`);

  const result = [];
  for (const c of comments) {
    const el = cheerio.load(c);
    const username = el('.entry-comment-username').text().trim();
    if (ignores.includes(username)) {
      logger.info(`skip ignore comment: ${username}`);
      continue;
    } else if (bookmark.users.includes(username)) {
      logger.info(`skip posted comment: ${username}`);
      continue;
    } else {
      bookmark.users.push(username);
    }
    const avatar_url = el('img').attr('src');
    const comment_content = el('span.entry-comment-text').text();
    const permalink = hatebu_url + el('.entry-comment-permalink > a').attr('href');

    try {
      const perma = await fetch(permalink);
      const perma_body = await perma.text();
      const perma_el = cheerio.load(perma_body);
      const date = perma_el('span.comment-body-date > a').text();
      const comment_date = new Date(date);
      await _sleep(1000);

      if (comment_date <= new Date(bookmark.updated_at)) {
        logger.info(`skip old comment: ${permalink}`)
        continue;
      }

      result.push({ username, avatar_url, comment_content, permalink, date });

    } catch (error) {
      logger.error(`unexpected error occurred, username: ${username}`);
      logger.error(error);
    }
  }

  logger.info(`end getComment: ${url}, ${result.length} comments were found.`);
  return result;
}
