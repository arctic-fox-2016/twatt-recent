var express = require('express');
var router = express.Router();
var http = require('http')
var oauth = require('oauth')

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
router.post('/twit',function (req,res,next) {

    myOauth.get(`https://api.twitter.com/1.1/users/search.json?q=${req.body.username}&page=1&count=1000`,
    '780589482588286977-jjhmNnrsuA8DrNubXF2ydKA1p3zmsho',
    '2CftURC60FldgAixSzIJvBRGoOVPiQXS710Jc8mZakpKO',
    (e,data,rs)=>{
      if(data){
      data = JSON.parse(data)

      data.sort(function (vala,valb) {
        return vala.id.toString() < valb.id.toString()
      })
      res.render('users',{users:data})
    }else{
      res.render('users',{users:[]})
    }
    })
})

module.exports = router;
