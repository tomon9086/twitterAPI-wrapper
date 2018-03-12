const Twitter = require("twitter")

const token = require("../token.js")
/*
token.js
module.exports = {
	twitter: {
		consumerKey: "*************************",
		consumerSecret: "**************************************************",
		accessToken: "**************************************************",
		accessTokenSecret: "*********************************************"
	}
}
*/

module.exports = new Twitter({
	consumer_key: token.twitter.consumerKey,
	consumer_secret: token.twitter.consumerSecret,
	access_token_key: token.twitter.accessToken,
	access_token_secret: token.twitter.accessTokenSecret
})
