const client = require("./twitter.js")

/**
 *	Put the file "../token.js", and write as below
 *
 *	module.exports = {
 *		twitter: {
 *			consumerKey: "*************************",
 *			consumerSecret: "**************************************************",
 *			accessToken: "**************************************************",
 *			accessTokenSecret: "*********************************************"
 *		}
 *	}
 */

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
	getHomeTimeline: async (count = 1, exclude_replies = true) => {
		return await client.get("statuses/home_timeline", {
			count,
			exclude_replies
		})
	},
	search: async (q, count = 1) => {
		return await client.get("search/tweets", {
			q,
			count
		})
	},
	/**
	 *	postStatus()
	 *	
	 *	@param String status <required>
	 *	@param Array medias <optional>
	 *	@param String in_reply_to_status_id <optional>
	 *	
	 *	@return Object tweet?
	 */
	postStatus: async (status, medias, in_reply_to_status_id) => {
		if(typeof medias === "string") in_reply_to_status_id = medias
		const media_ids = medias instanceof Array && medias.join(",") ? medias.join(",") : undefined
		// if(typeof medias === "string") media_ids = medias
		if(in_reply_to_status_id && isNaN(Number(in_reply_to_status_id))) return
		return await client.post("statuses/update", {
			status,
			media_ids,
			in_reply_to_status_id
		})
	},
	postImage: async (buffer) => {
		return await client.post("media/upload", {
			media: buffer
		})
	},
	postMP4: async function(buffer) {
		return await this._postMedia(buffer, "video/mp4")
	},
	postGif: async function(buffer) {
		return await this._postMedia(buffer, "image/gif")
	},
	_postMedia: async (buffer, media_type) => {
		const makePost = async (opt) => {
			return await client.post("media/upload", opt)
		}
		const media_id = (await makePost({
			command: "INIT",
			total_bytes: buffer.length,
			media_type,
		})).media_id_string
		await makePost({
			command: "APPEND",
			media_id,
			media: buffer,
			segment_index: 0
		})
		await makePost({
			command: "FINALIZE",
			media_id
		})
		return media_id
	}
}
