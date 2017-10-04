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

const getSourceName = (status) => {
  const match = status.source.match(/<a href=".+" target="_blank">(.+)<\/a>/)
  if (match) return match[1]
  return status.source
}

streamer.on('message.mention', data => {
  const source = getSourceName(data.object)
  if (source === '小饭' && data.object.text.match(/^@小饭师傅 我成为了分发者。$/)) {
    ff.post('/statuses/update', {
      status: `通知：@${data.object.user.name} 成为了分发者。`,
      repost_status_id: data.object.id
    }, (err, res) => {
      if (err) console.log(err)
    })
  }
})

streamer.start()
