'use strict'

const Streamer = require('fanfou-streamer')
const Fanfou = require('fanfou-sdk')

const {
  CONSUMER_KEY: consumerKey,
  CONSUMER_SECRET: consumerSecret,
  OAUTH_TOKEN: oauthToken,
  OAUTH_TOKEN_SECRET: oauthTokenSecret
} = require('./config')

const streamer = new Streamer({
  consumerKey,
  consumerSecret,
  oauthToken,
  oauthTokenSecret
})

const ff = new Fanfou({
  auth_type: 'oauth',
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  oauth_token: oauthToken,
  oauth_token_secret: oauthTokenSecret
})

streamer.on('message.mention', data => {
  if (data.object.text.match(/^@小饭师傅 我成为了分发者。$/)) {
    ff.post('/statuses/update', {
      status: `通知：@${data.object.user.name} 成为了分发者。`,
      repost_status_id: data.object.id
    }, (err, res) => {
      if (err) console.log(err)
    })
  }
})

streamer.start()
