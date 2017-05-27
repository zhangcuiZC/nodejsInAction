var express = require('express');
var router = express.Router();
var Photo = require('../models/Photo');
var path = require('path');
var multer = require('multer'); 
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../public/photos'));
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});
var upload = multer({ storage: storage });

router.get('/', function(req, res, next) {
	Photo.find({}, function(err, photos) {
		if (err) {
			return next(err);
		}
		res.render('photos', { 
			title: 'Photos',
			photos: photos
		});
	});
	
});

router.get('/upload', function(req, res) {
	res.render('photos/upload', {
		title: 'Photo upload'
	});
});

router.post('/upload', upload.any(), function(req, res, next) {
	var name = req.body.photo.name;
	var _path = path.join('/photos', req.files[0].originalname);

	var photo = new Photo({
		name: name,
		path: _path
	});
	photo.save(function(err) {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});

});

router.get('/photo/:id/download', function(req, res, next) {
	var id = req.params.id;
	Photo.findById(id, function(err, photo) {
		if (err) {
			return next(err);
		}
		var _path = path.join(__dirname, '../public', photo.path);
		res.download(_path);
	});
});

module.exports = router;