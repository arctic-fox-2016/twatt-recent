"use-strict"

let express = require('express')
let	app = express()
let	bodyParser = require('body-parser')
let	OAuth = require('oauth')
let	http = require('http')
let	port = process.env.PORT || 3000
let	router = express.Router()
let	expressLayouts = require('express-ejs-layouts')

app.use(express.static(__dirname + '/public'))
app.use(expressLayouts)

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port)

var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	'PUVrm0PcRGICBYJkx2Vgn2UqI',
	'PBOIc4GWc8SA6wd836Iwt4xbpjvVUVWVAG0ldXTRKQQf00mVMF',
	'1.0A',
	null,
	'HMAC-SHA1'
)

app.get('/', function(req,res){
	oauth.get(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?count=10`,
      '780647183234195456-MuN7SDrLFjxZcVMR0xGnAjGl5qiBDPw', //test user token
      'An6V8gmmFmOJ8vhWsCFflz1lBPqlRTcFtrXgu34bCuTZl', //test user secret
      function (e, data, resj){
        if (e){
        	console.error(e)
        } else {
        	var result = JSON.parse(data)
        	res.render('index', {myTweet: result})
        }
    })
})

app.post('/search', function(req,res,next){
	oauth.get(
      `https://api.twitter.com/1.1/search/tweets.json?count=50&q=${req.body.search}`,
      '780647183234195456-MuN7SDrLFjxZcVMR0xGnAjGl5qiBDPw', //test user token
      'An6V8gmmFmOJ8vhWsCFflz1lBPqlRTcFtrXgu34bCuTZl', //test user secret
      function (e, data, resj){
        if (e){
        	console.error(e)
        } else {
        	var result = JSON.parse(data)
        	res.render('search', {word_searched: result})
        }
    })
})
