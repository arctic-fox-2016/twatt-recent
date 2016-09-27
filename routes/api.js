var express = require('express');
var router = express.Router();

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'yp9ZgsUDL7PI9jOECDfUesaTC',
  consumer_secret: 'QaBFH5tLN3KMZoQWl4QLAc7X94nmWDInLhe1MyZOIukuLJvgqP',
  access_token_key: '3146961314-p27SsJ8JPuxnP9MyTozMrvQGv0fYyAxNkyM7chJ',
  access_token_secret: 'aAaRROSStNinlTQwac0PlzRolx7rB7bpLpPKfVY9usLbe'
});

router.get('/', function(req, res, next) {
  client.get('statuses/user_timeline', function(error, tweet, response) {
    res.render('status', {
      data: tweet
    })
  })
});

router.post('/update', function(req, res, next) {
  client.post('statuses/update', {status: req.body.status}, function(error, tweet, response) {
    res.redirect('/')
  })
});

module.exports = router;
