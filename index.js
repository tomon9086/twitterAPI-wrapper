const client = require("./twitter.js")

module.exports = {
	getTimeline: async (user_id, count = 1, exclude_replies = true) => {
		return await client.get("statuses/user_timeline", {
			user_id,
			count,
			exclude_replies
		})
	},
	getTimelineByScreenName: async (screen_name, count = 1, exclude_replies = true) => {
		return await client.get("statuses/user_timeline", {
			screen_name,
			count,
			exclude_replies
		})
	},
	postStatus: async (status, medias) => {
		let media_ids = undefined
		if(medias instanceof Array) media_ids = medias.join(",")
		return await client.post("statuses/update", {
		})
	},
	postMedia: async (buffer) => {
		return await client.post("media/upload", {
			media: buffer
		})
	}
}
