const { postComment } = require('../lib/postComment');
const { _sleep } = require('../lib/_sleep');
const { limit_days, schedule } = require('../config.json');
const { logger } = require('../logger');
const cron = require('node-cron');
const { getComment } = require('../lib/getComment');
const { getAllBookmarks, updateBookmark, deleteBookmark } = require('../lib/bookmark');
const { getAllIgnores } = require('../lib/ignore');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		logger.info(`Ready! Logged in as ${client.user.tag}`);
		cron.schedule(schedule, async () => {
			logger.info('start get and post comment.');
			const bookmarks = await getAllBookmarks();
			const ignores = await getAllIgnores();
			const keys = Object.keys(bookmarks);
			for (const key of keys) {
				const bookmark = bookmarks[key];
				const comments = await getComment(bookmark, ignores);
				if (comments.length > 0) {

					// 対象のコメントを投稿日時の昇順でソート
					comments.sort((a, b) => {
						return Date.parse(a.date) - Date.parse(b.date);
					});

					// updated_at を更新する
					bookmark.updated_at = new Date();
					await updateBookmark(bookmark);

					for (const comment of comments) {
						await postComment(comment, key);
						await _sleep(3000);
					}
				} else {
					// 取得したコメントが無かった場合
					logger.info('No new comment.')

					// users を反映させるため update する
					await updateBookmark(bookmark);

					// 最終投稿日時と現在時刻を比較し、
					// config.limit_days 日が経過していた場合はbookmarkを削除する
					// または、bookmark.updated_at が null の場合も削除する
					const updated_at = new Date(bookmark.updated_at);
					const limit_date = new Date(updated_at.setDate(updated_at.getDate() + limit_days));
					if (!bookmark.updated_at || limit_date < new Date()) {
						logger.info(`Delete bookmark ${bookmark.url} because the date of limit is over.`)
						await deleteBookmark(bookmark);
					}
				}

				await _sleep(1000);
			}
			logger.info('end get and post comment.');
		})
	},
};
