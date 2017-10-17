'use strict'

const Streamer = require('fanfou-streamer')
const Fanfou = require('fanfou-sdk')

const {
  CONSUMER_KEY: consumerKey,
  CONSUMER_SECRET: consumerSecret,
  OAUTH_TOKEN: oauthToken,
  OAUTH_TOKEN_SECRET: oauthTokenSecret
} = require('./config')

const options = {
  consumerKey,
  consumerSecret,
  oauthToken,
  oauthTokenSecret
}

const streamer = new Streamer(options)
const ff = new Fanfou(options)

streamer.on('message.mention', data => {
  if (data.object.text.match(/^@小饭师傅 我成为了分发者。$/)) {
    ff.post('/statuses/update', {
      status: `通知：@${data.object.user.name} 成为了分发者。`,
      repost_status_id: data.object.id
    }, (err, res) => {
      if (err) console.log(data.object.user.name, `(${data.object.user.id})`, err.message)
    })
  }
})

streamer.start()
