var connect = require('connect');
var cookieParser = require('cookie-parser');
// var app = connect()
// 	.use(cookieParser('zc'))
// 	.use(function(req, res) {
// 		console.log(req.cookies);
// 		console.log(req.signedCookies);
// 		res.end('hello\n');
// 	}).listen(3000);

var app = connect()
	.use(function(req, res) {
		res.setHeader('Set-Cookie', 'foo=bar');
		res.end();
	}).listen(3000);