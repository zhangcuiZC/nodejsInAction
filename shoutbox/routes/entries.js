var express = require('express');
var router = express.Router();
var Entry = require('../lib/entry');
var page = require('../lib/middleware/page');

/* GET home page. */
router.get('/:page?', page(Entry.count, 5), function(req, res, next) {
	var page = req.page;
	Entry.getRange(page.from, page.to, function(err, entries) {
		if (err) {
			return next(err);
		}
		res.render('entries', {
			title: 'Entries',
			entries: entries
		});
	});
});

module.exports = router;
