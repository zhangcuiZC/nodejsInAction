var express = require('express');
var router = express.Router();
var User = require('../lib/user');

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	var data = req.body;
	User.getByName(data.name, function(err, user) {
		if (err) {
			return next(err);
		}

		if (user.id) {
			res.redirect('back');
		}else {
			user = new User({
				name: data.name,
				pass: data.pass
			});
			user.save(function(err) {
				if (err) {
					return next(err);
				}
				req.session.uid = user.id;
				res.redirect('/');
			});
		}
	});
});

module.exports = router;
