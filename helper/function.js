let config = require('../config/app-config.js')
let OAuth = require('oauth')
let myoauth = new OAuth.OAuth(
  	config.request_token_url,
    config.access_token_url,
    config.consumer_key,
    config.consumer_secret,
    '1.0A',
    null,
    'HMAC-SHA1'
)

class Generic {
  static kata(input){
    let output = input.replace(/#/ig, "%23")
    return output
  }

  static timeline(callback){
    myoauth.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json',
      config.user_token,
      config.user_secret,
      function(e,data,rs){
        if(e){
          console.error(e)
        } else {
          let result_timeline = JSON.parse(data)
          callback(result_timeline)
        }
      }
    )
  }

  static search(input, callback){
    myoauth.get(
      `https://api.twitter.com/1.1/search/tweets.json?count=10&q=${input}`,
      config.user_token,
      config.user_secret,
      function(e,data,rs){
        if(e){
          console.error(e)
        } else {
          let result_search = JSON.parse(data)
          callback(result_search)
        }
      }
    )
  }
}

module.exports = Generic
