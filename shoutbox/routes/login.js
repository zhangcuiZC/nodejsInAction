var express = require('express');
var router = express.Router();
var User = require('../lib/user');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next) {
	var data = req.body;
	User.authenticate(data.name, data.pass, function(err, user) {
		if (err) {
			return next(err);
		}
		if (user) {
			req.session.uid = user.id;
			res.redirect('/');
		}else {
			console.log('Invalid credentials');
			res.redirect('back');
		}
	});
});

router.get('/out', function(req, res, next) {
	req.session.destroy(function(err) {
		if (err) {
			throw err;
		}
		res.redirect('/');
	});
});

module.exports = router;
