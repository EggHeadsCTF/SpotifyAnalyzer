const secrets = require('../../secrets');
const Spotify = require('spotify-web-api-node');
const secretVars = new secrets.secrets();

let rspData = '';

// credentials are optional
const s = new Spotify({
clientId: secretVars.clientID,
clientSecret: secretVars.clientSecret,
redirectUri: secretVars.redirectURI
});

//* Takes URI and returns object with attr id and type
let parseInput = (input) => {
	var parserSI = input.split('?')[0];
	let result = parserSI.match(/(album|track|tracks|playlist)\/(.*)/g);
	return /(album)/g.test(input) ? {id: result.join("").split("/")[1], type: 'album'}
			: /(track|tracks)/g.test(input) ? {id: result.join("").split("/")[1], type: 'track'} 
			: /(playlist)/g.test(input) ? {id: result.join("").split("/")[1], type: 'playlist'} 
			: null;
}

// Authenticate and get access token
let setCredentials = () => {
    return new Promise((resolve, reject) => {
        s.clientCredentialsGrant().then((data) => {
            rspData = data; // For future
            // Save the access token so that it's used in future calls
            s.setAccessToken(data.body['access_token']);
            resolve();
        }).catch(function(err) {
            reject(err);
        });
    });
};


let retObj = {};

module.exports.api = async (userInput) => {
    let mediaURI = parseInput(userInput);
    await setCredentials();
    if(mediaURI.type === "track") {
        retObj.type = "track";

        retObj.trackInfo = (await s.getTrack(mediaURI.id)).body;
        retObj.audioFeatures = (await s.getAudioFeaturesForTrack(mediaURI.id)).body;
        return retObj;
        /* structure:
            {
                type
                trackInfo
                audioFeatures
            } */
    } else if(mediaURI.type === "album") {
        retObj.type = "album";

        let trackIDs = (await s.getAlbumTracks(mediaURI.id)).body.items.map(val => val.id);
        retObj.trackInfo = (await s.getTracks(trackIDs)).body.tracks;
        retObj.audioFeatures = (await s.getAudioFeaturesForTracks(trackIDs)).body.audio_features;
        return retObj;
        /* structure:
            {
                type
                trackInfo
                audioFeatures
            } */
    } else if(mediaURI.type === "playlist") {
        retObj.type = "playlist";

        retObj.playlistInfo = (await s.getPlaylist(mediaURI.id)).body;

        let numTracks = retObj.playlistInfo.tracks.total;
        let idArray = [];

        console.log("track ids");
        // 100 track id limit, so we query 100 tracks at a time
        for(let i = 0; i < numTracks; i+= 100) {
            idArray = idArray.concat((await s.getPlaylistTracks(mediaURI.id, {offset: i})).body.items.map(val => val.track.id));
        }
        
        // first query so we get an array to concat to
        retObj.audioFeatures = (await s.getAudioFeaturesForTracks(idArray.slice(0, 100))).body.audio_features;
        // query 100 tracks at a time for audio features
        console.log("audio features");
        for(let i = 100; i < idArray.length; i += 100) {
            console.log(i);
            retObj.audioFeatures = retObj.audioFeatures.concat((
                await s.getAudioFeaturesForTracks(idArray.slice(i, i+100))
            ).body.audio_features);
        }

        // first query so we get other data and an array to concat to
        retObj.trackInfo = (await s.getTracks(idArray.slice(0, 50))).body.tracks;
        // query 50 tracks at a time for track info
        console.log("track");
        for(let i = 50; i < idArray.length; i+= 50) {
            console.log(i);
            retObj.trackInfo = retObj.trackInfo.concat((
                await s.getTracks(idArray.slice(i, i+50))
            ).body.tracks);
        }
        
        return retObj;
        /* structure:
            {
                type
                playlistInfo
                trackInfo
                audioFeatures
            } */
    }
};


