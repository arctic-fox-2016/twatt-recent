var express = require('express');
var router = express.Router();
var http = require('http')
var oauth = require('oauth')
var request = require('request')
var twitterAPI = require('node-twitter-api')

var twitter =  new twitterAPI({
  consumerKey: 'LxNW6bdtf7ZdDgL5GR1bAXfSo',
  consumerSecret: 'xG6LqoL6JPjWRUAhjT88E2XG3nu3tV3XUjoMcUU7v3IsUVUgZC'
})

var myOauth = new oauth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'LxNW6bdtf7ZdDgL5GR1bAXfSo',
  'xG6LqoL6JPjWRUAhjT88E2XG3nu3tV3XUjoMcUU7v3IsUVUgZC',
  '1.0',
  null,
  'HMAC-SHA1')




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/twit', function(req, res, next) {
  res.render('users',{users:[]})
  // res.render('index', { title: 'Express' });
});
router.get('/newtwit', function(req, res, next) {
  res.render('newtwit',{users:[]})
  // res.render('index', { title: 'Express' });
});
router.post('/twit',function (req,res,next) {

    myOauth.get(`https://api.twitter.com/1.1/users/search.json?q=${req.body.username}&page=1&count=1000`,
    '780589482588286977-jjhmNnrsuA8DrNubXF2ydKA1p3zmsho',
    '2CftURC60FldgAixSzIJvBRGoOVPiQXS710Jc8mZakpKO',
    (e,data,rs)=>{
      if(data){
      data = JSON.parse(data)

      data.sort(function (vala,valb) {
        return valb.followers_count - vala.followers_count
      })
      res.render('users',{users:data})
    }else{
      res.render('users',{users:[]})
    }
    })
})
router.post('/newtwit',function (req,res,next) {

    twitter.statuses('update',{
        status: `${req.body.twittext}`
      },
      '780589482588286977-jjhmNnrsuA8DrNubXF2ydKA1p3zmsho',
      '2CftURC60FldgAixSzIJvBRGoOVPiQXS710Jc8mZakpKO',
      function (err,data,_res) {
        console.log(data)
        console.log(_res)
        res.send('ok')
      })
})

module.exports = router;
