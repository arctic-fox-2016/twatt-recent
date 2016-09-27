var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	OAuth = require('oauth'),
	http = require('http'),
	port = process.env.PORT || 3000,
	router = express.Router(),
	expressLayouts = require('express-ejs-layouts')

app.use(express.static(__dirname + '/public'))
app.use(expressLayouts)

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port)

var oauth = new OAuth.OAuth(
	'https://api.twitter.com/oauth/request_token',
	'https://api.twitter.com/oauth/access_token',
	'9JjsKfpu2pznY7QzHoVAzCT0t',
	'lnllLgSN2kZCdaOLqp1ocAgUipybo8EH3fe93RbEBdz0bSfGRA',
	'1.0A',
	null,
	'HMAC-SHA1'
)

//routes
app.get('/', function(req,res){
	oauth.get(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?count=10`,
      '780630141328166912-iCCT0kMdQajkV5iOwJIOJWBMzvcK79x', //test user token 
      'A3PayBUBlQEj1FlvKU0qPazBC4W731l1JzOvQs7o0Cmdo', //test user secret             
      function (e, data, resj){
        if (e){
        	console.error(e)
        	// console.log(require('util').inspect(data))
        	// done()
        } else {
        	var result = JSON.parse(data)
        	res.render('index', {my_tweet: result})
        	// var result = JSON.parse(data)
        	// res.render('search', {searched_word: result})
        }      
    })
})


app.post('/search', function(req,res,next){
	oauth.get(
      `https://api.twitter.com/1.1/search/tweets.json?count=30&q=${req.body.word}`,
      '780630141328166912-iCCT0kMdQajkV5iOwJIOJWBMzvcK79x', //test user token 
      'A3PayBUBlQEj1FlvKU0qPazBC4W731l1JzOvQs7o0Cmdo', //test user secret             
      function (e, data, resj){
        if (e){
        	console.error(e)
        	// console.log(require('util').inspect(data))
        	// done()
        } else {
        	//res.send(data)
        	var result = JSON.parse(data)
        	res.render('search', {searched_word: result})
        }      
    })
})

