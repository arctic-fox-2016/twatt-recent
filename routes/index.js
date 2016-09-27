var express = require('express');
var router = express.Router();
var http = require('http')
	//var oauth = require('oauth')
var twitConfig = require('../config.js')
var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: twitConfig.consumerKey,
	consumer_secret: twitConfig.consumerSecret,
	access_token_key: twitConfig.accessToken,
	access_token_secret: twitConfig.accessTokenSecret
});

function connectOauth() {
	return new oauth.OAuth(
		'https://api.twitter.com/oauth/request_token',
		'https://api.twitter.com/oauth/access_token',
		twitConfig.consumerKey,
		twitConfig.consumerSecret,
		'1.0A',
		null,
		'HMAC-SHA1'
	)
}

/* GET home page. */
router.get('/', function (req, res, next) {
	client.get('statuses/user_timeline', {
		screen_name: 'liliwibiesono'
	}, function (error, tweets, response) {
		if (!error) {
			res.render('index', {
				title: 'Twatt!',
				myTimeline: tweets
			})
		}
	});


});

router.post('/mytwatt', function (req, res, next) {
	console.log('mytwatt : ', req.body.mytwatt)

	client.post('statuses/update', {
		status: req.body.mytwatt
	}, function (error, tweets, response) {
		if (error) throw error
		console.log(tweets)
		console.log(response)
		res.redirect('/')
	})

})


// router.post('/search', function (req, res, next) {
// 	connectOauth().get(
// 		'https://api.twitter.com/1.1/search/tweets.json?q=' + req.body.searchQuery,
// 		twitConfig.accessToken,
// 		twitConfig.accessTokenSecret,
// 		function (err, data, rs) {
// 			if (err) console.error(err)
// 			console.log(require('util').inspect(data));
// 			var hasil = JSON.parse(data)
// 				//res.send(hasil.statuses)
// 			res.render('search', {
// 				title: 'Twatt!',
// 				dataTwitter: hasil.statuses,
// 			})
// 		}
// 	)
// })
//
// router.get('/status', function (res) {
// 	console.log(`Got response: ${res.statusCode}`)
// 	res.resume()
// })

module.exports = router;
