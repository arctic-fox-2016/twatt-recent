"use-strict"
let express = require('express')
let app = express()
let OAuth = require('oauth')
let http = require('http')
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

let kata = function(input){
  let output = input.replace(/#/ig, "%23")
  return output
}

let get_data = function(query,callback){
  let input = kata(query)
  myoauth.get(
    'https://api.twitter.com/1.1/statuses/home_timeline.json',
    "780590703545946112-lXrMYSlTMCK4AlthI3svYpfPEqp3GwK",
    "pN3eSlhILnZKw4i29ROWYQBqmSyWpfOi5ycxUX8zpLrRY",
    function(e,data,rs){
      if(e){
        console.error(e)
      } else {
        let result_timeline = JSON.parse(data)
        myoauth.get(
          `https://api.twitter.com/1.1/search/tweets.json?count=10&q=${input}`,
          "780590703545946112-lXrMYSlTMCK4AlthI3svYpfPEqp3GwK",
          "pN3eSlhILnZKw4i29ROWYQBqmSyWpfOi5ycxUX8zpLrRY",
          function(e,data,rs){
            if(e){
              console.error(e)
            } else {
              let result_search = JSON.parse(data)
              console.log('masuk')
              callback(result_timeline, result_search)
            }
          }
        )
      }
    }
  )


}

let myoauth = new OAuth.OAuth(
  	"https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "nnokV2lzBmdm8IaKTnB9wpZex",
    "war9jmdR2cqdIXD3UiqIgoDs8PUj06cOMINKBIHr1ZEzYeLzqU",
    '1.0A',
    null,
    'HMAC-SHA1'
)

app.set('port', process.env.PORT || 3000)
app.set('view-engine', 'ejs')

app.get('/', function(req,res,next){
  myoauth.get(
    'https://api.twitter.com/1.1/statuses/home_timeline.json',
    "780590703545946112-lXrMYSlTMCK4AlthI3svYpfPEqp3GwK",
    "pN3eSlhILnZKw4i29ROWYQBqmSyWpfOi5ycxUX8zpLrRY",
    function(e,data,rs){
      if(e){
        console.error(e)
      } else {
        let result_timeline = JSON.parse(data)
        res.render('index.ejs', {timeline: result_timeline, data: null})
      }
    }
  )
})

app.post('/', function(req,res,next){
  // res.send('test')
  // let input = kata(req.body.q)
  // myoauth.get(
  //   'https://api.twitter.com/1.1/statuses/home_timeline.json',
  //   "780590703545946112-lXrMYSlTMCK4AlthI3svYpfPEqp3GwK",
  //   "pN3eSlhILnZKw4i29ROWYQBqmSyWpfOi5ycxUX8zpLrRY",
  //   function(e,data,rs){
  //     if(e){
  //       console.error(e)
  //     } else {
  //       let result_timeline = JSON.parse(data)
  //       done()
  //     }
  //   }
  // )
  //
  // myoauth.get(
  //   `https://api.twitter.com/1.1/search/tweets.json?count=10&q=${input}`,
  //   "780590703545946112-lXrMYSlTMCK4AlthI3svYpfPEqp3GwK",
  //   "pN3eSlhILnZKw4i29ROWYQBqmSyWpfOi5ycxUX8zpLrRY",
  //   function(e,data,rs){
  //     if(e){
  //       console.error(e)
  //     } else {
  //       let result_search = JSON.parse(data)
  //       done()
  //     }
  //   }
  // )
  //
  // res.render('index.ejs', {timeline: result_timeline, data: result_search})
  get_data(req.body.q,function(result_timeline,result_search){
    res.render('index.ejs', {data: result_search, timeline:result_timeline})
  })
})

app.get('/timeline', function(req,res,next){
  myoauth.get(
    'https://api.twitter.com/1.1/statuses/home_timeline.json',
    "780590703545946112-lXrMYSlTMCK4AlthI3svYpfPEqp3GwK",
    "pN3eSlhILnZKw4i29ROWYQBqmSyWpfOi5ycxUX8zpLrRY",
    function(e,data,rs){
      if(e){
        console.error(e)
      } else {
        let result_timeline = JSON.parse(data)
        res.json(result)
      }
    }
  )
})

app.listen(app.get('port'), function(){
  console.log('listening on port', app.get('port'))
})
