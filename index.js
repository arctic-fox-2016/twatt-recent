"use-strict"
let express = require('express')
let app = express()
let OAuth = require('oauth')
let http = require('http')
let bodyParser = require('body-parser')
let config = require('./config/app-config.js')
let Generic = require('./helper/function.js')
let router = express.Router()

app.use(bodyParser.urlencoded({extended:true}))

app.set('port', process.env.PORT || 3000)
app.set('view-engine', 'ejs')

app.get('/', function(req,res,next){
  Generic.timeline(function(result_timeline){
    res.render('index.ejs', {timeline: result_timeline, data: null})
    console.log('test')
  })
})

app.post('/', function(req,res,next){
  Generic.timeline(function(result_timeline){
    let timeline = result_timeline
    Generic.search(req.body.q,function(result_search){
      let search = result_search
      res.render('index.ejs', {timeline: timeline, data: search})
    })
  })
})

app.listen(app.get('port'), function(){
  console.log('listening on port', app.get('port'))
})
