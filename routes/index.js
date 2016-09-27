var express = require('express');
var router = express.Router();

var sys = require('sys');
var Twitter = require('twitter');
var twitterAPI = require('node-twitter-api');

var oauth = require('oauth');
var _consumer_key= 'Q8PcIX03xFtbLk8CBQy2rqEN8';
var _consumer_secret= 'JoZyKqS4MTvKaegVKy4xWJH063P9pX3C1cysY8XvRGmAIXcm2U';
var _access_token_key= '44306843-tUGQHsIlQk8eQFpzUKkVJ0gqI8slc2cpQxEmJcqui';
var _access_token_secret= '11y2mnH5MDaXymQKrD3OvaiMZJwwPbrbCrTPwXVnxyQTE';

var twitter = new twitterAPI({
    consumerKey: _consumer_key,
    consumerSecret: _consumer_secret
});

function auth() {
  return new oauth.OAuth(
    "https://api.twitter.com/oauth/request_token", "https://api.twitter.com/oauth/access_token",
    _consumer_key, _consumer_secret, "1.0A", null, "HMAC-SHA1");
}

router.get('/', function(req, res, next) {
  auth().get(
    'https://api.twitter.com/1.1/statuses/user_timeline.json?count=100&screen_name=ariadiprana',
      _access_token_key,
      _access_token_secret,
      function (e, data, rest){
        if (e) console.error(e);
        //console.log(require('util').inspect(data));
        var tweets = JSON.parse(data)
        //res.send(tweets)
        //res.send(tweets.statuses[0].text)
        res.render('index', { tweets: tweets });
      })
  //res.render('index', { title: 'Express' });
});

router.post('/result', function(req, res, next) {
  auth().get(
    'https://api.twitter.com/1.1/search/tweets.json?count=100&q='+req.body.kata,
      _access_token_key,
      _access_token_secret,
      function (e, data, rest){
        if (e) console.error(e);
        //console.log(require('util').inspect(data));
        var tweets = JSON.parse(data)
        //res.send(tweets)
        //res.send(tweets.statuses[0].text)
        res.render('result', { tweets: tweets,q:req.body.kata });
      })
});

router.post('/ngetweet', function(req, res, next) {
  twitter.statuses("update", {
        status: req.body.tweet
    },
    _access_token_key,
    _access_token_secret,
    function(error, data, response) {
        if (error) {
            console.error(error);
        } else {
            res.redirect('/')
        }
    }
  )
  // auth().post(
  //   'https://api.twitter.com/1.1/statuses/update.json?status='+req.body.tweet,
  //     _access_token_key,
  //     _access_token_secret,
  //     function (e, data, rest){
  //       if (e) console.error(e);
  //       //console.log(require('util').inspect(data));
  //       var tweets = JSON.parse(data)
  //       //res.send(tweets)
  //       //res.send(tweets.statuses[0].text)
  //       res.render('index');
  //     })
});

module.exports = router;
