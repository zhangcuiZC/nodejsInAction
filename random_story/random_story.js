let fs = require('fs');
let request = require('request');
let htmlparser = require('htmlparser');
let configFilename = './rss_feeds.txt';

// function checkForRSSFile() {
// 	fs.exists(configFilename, function(exists) {
// 		if (!exists) {
// 			return next(new Error('Missing RSS file: ' + configFilename));
// 		}
// 		next(null, configFilename);
// 	});
// }
function checkForRSSFile() {
	return new Promise((resolve, reject) => {
		fs.exists(configFilename, (exists) => {
			if (!exists) {
				reject(new Error('Missing RSS file: ' + configFilename));
			}
			resolve();
		});
	});
}

// function readRSSFile(configFilename) {
// 	fs.readFile(configFilename, function(err, feedList) {
// 		if (err) {
// 			return next(err);
// 		}

// 		feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split("\n");
// 		var random = Math.floor(Math.random()*feedList.length);
// 		next(null, feedList[random]);
// 	});
// }
function readRSSFile(configFilename) {
	return new Promise((resolve, reject) => {
		fs.readFile(configFilename, (err, feedList) => {
			if (err) {
				reject(err);
			}
			feedList = feedList.toString().replace(/^\s+|\s+$/g, '').split("\n");
			let random = Math.floor(Math.random()*feedList.length);
			resolve(feedList[random]);
		});
	});
}

// function downloadRSSFeed(feedUrl) {
// 	request({uri: feedUrl}, function(err, res, body) {
// 		if (err) {
// 			return next(err);
// 		}
// 		if (res.statusCode !== 200) {
// 			return next(new Error('Abnormal response status code'));
// 		}
// 		next(null, body);
// 	});
// }
function downloadRSSFeed(feedUrl) {
	return new Promise((resolve, reject) => {
		request({uri: feedUrl}, (err, res, body) => {
			if (err) {
				reject(err);
			}
			if (res.statusCode !== 200) {
				reject(new Error('Abnormal response status code'));
			}
			resolve(body);
		});
	});
}

// function parseRSSFeed(rss) {
// 	var handler = new htmlparser.RssHandler();
// 	var parser = new htmlparser.Parser(handler);
// 	parser.parseComplete(rss);
// 	if (!handler.dom.items.length) {
// 		return next(new Error('No RSS items found.'));
// 	}
// 	var item = handler.dom.items.shift();
// 	console.log(item.title);
// 	console.log(item.link);
// }
function parseRSSFeed(rss) {
	let handler = new htmlparser.RssHandler();
	let parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);
	if (!handler.dom.items.length) {
		throw new Error('No RSS items found.');
	}
	let item = handler.dom.items.shift();
	console.log(item.title);
	console.log(item.link);
}

// var tasks = [
// 		checkForRSSFile,
// 		readRSSFile,
// 		downloadRSSFeed,
// 		parseRSSFeed
// 	];
// function next(err, result) {
// 	if (err) {
// 		throw err;
// 	}
// 	var currentTask = tasks.shift();
// 	if (currentTask) {
// 		currentTask(result);
// 	}
// }

// next();

async function getRSSFeed() {
	await checkForRSSFile();
	let url = await readRSSFile(configFilename);
	let rss = await downloadRSSFeed(url);
	return rss;
}
getRSSFeed().then(rss => parseRSSFeed(rss), e => console.log(e));

