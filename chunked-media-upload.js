// Example from https://github.com/desmondmorris/node-twitter/tree/master/examples#chunked-media

const Twitter     = require('twitter');
const client      = new Twitter({ /** ... **/ });

const pathToMovie = '/path/to/your/video/animated-gif.gif';
const mediaType   = 'image/gif'; // `'video/mp4'` is also supported
const mediaSize    = require('fs').statSync(pathToMovie).size;

async function uploadMP4(buffer) {
  const makePost = async (opt) => {
    return await client.post('media/upload', opt)
  }
  const media_id = await makePost({
    command    : 'INIT',
    total_bytes: buffer.length,
    media_type : "video/mp4",
  }) // Declare that you wish to upload some media
  await makePost({
    command      : 'APPEND',
    media_id     : media_id,
    media        : buffer,
    segment_index: 0
  }) // Send the data for the media
  await makePost({
    command : 'FINALIZE',
    media_id: media_id
  }) // Declare that you are done uploading chunks
  return media_id
}

/**
 * Step 1 of 3: Initialize a media upload
 * @return Promise resolving to String mediaId
 */

/**
 * Step 2 of 3: Append file chunk
 * @param String mediaId    Reference to media object being uploaded
 * @return Promise resolving to String mediaId (for chaining)
 */
function appendUpload async (mediaId) {
  return await client.post('media/upload', )
}

/**
 * Step 3 of 3: Finalize upload
 * @param String mediaId   Reference to media
 * @return Promise resolving to mediaId (for chaining)
 */
function finalizeUpload (mediaId) {
  return makePost('media/upload', {
    command : 'FINALIZE',
    media_id: mediaId
  }).then(data => mediaId);
}

/**
 * (Utility function) Send a POST request to the Twitter API
 * @param String endpoint  e.g. 'statuses/upload'
 * @param Object params    Params object to send
 * @return Promise         Rejects if response is error
 */
function makePost (endpoint, params) {
  return new Promise((resolve, reject) => {
    client.post(endpoint, params, (error, data, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}