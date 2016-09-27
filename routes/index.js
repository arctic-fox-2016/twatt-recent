let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let config = require('../config/app-config.js')
let Generic = require('../helper/function.js')
let router = express.Router()

router.use(bodyParser.urlencoded({extended:true}))

router.get('/', function(req,res,next){
  Generic.timeline(function(result_timeline){
    res.render('index.ejs', {timeline: result_timeline, data: null})
  })
})

router.post('/', function(req,res,next){
  Generic.timeline(function(result_timeline){
    let timeline = result_timeline
    Generic.search(req.body.q,function(result_search){
      let search = result_search
      res.render('index.ejs', {timeline: timeline, data: search})
    })
  })
})

module.exports = router
