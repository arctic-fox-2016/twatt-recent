var express = require('express')
var router = express.Router()
var OAuth = require('oauth')
var http = require('http')
//var auth = require('./models/auth')
var Twitter = require('twitter')
var client = new Twitter({
  consumer_key: "pjbfjjiojjaiy9wq8asdsa8du89qewyug89h",
  consumer_secret: "gdsdsgreiuhrge9grehouisyh98dasd89sadu89uw",
  access_token_key: "69251620-gdju89yur79wyhudshu9ihcdfsihu",
  access_token_secret: "bgdfbosdhofudsfhui"
});

var myoauth = new OAuth.OAuth(
	"https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  "TWBI2C2gO18JAN9NjUsHtqEse",
  "fmkk87g8hYrnMN1odHFdbO31lFlUt9kNGLyrZ8BjhdKkXVswKu",
  '1.0A',
  null,
  'HMAC-SHA1'
)

router.get('/', function(req, res, next) {
	myoauth.get(
    `https://api.twitter.com/1.1/statuses/user_timeline.json?count=10&screen_name=digachandra`,
    "69251620-qw3N3dHKFXtWZ2qbY8thCBE0iyXNL2vtvqoTyYUtf",
    "jjxweAjAU0jBIXBs5OBF1jpJS0co2wqFeaBHhhzNtJupT",
    function(e, data, rs){
      if(e){
        console.error(e)
      } else {
        let result = JSON.parse(data)
				//res.json(result[0].user)
        res.render('template/body', {
          title: 'Twatt App',
					profile: result[0].user,
          tweet: result
        })
      }
    }
  )
})

router.post('/', function(req, res, next){
	client.post('statuses/update', {status: req.body.tweet},  function(error, tweet, response) {
	  if(error) throw error;
		res.redirect('/')
	});
})

module.exports = router;
