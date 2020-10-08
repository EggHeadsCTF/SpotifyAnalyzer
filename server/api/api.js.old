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
function parseInput (input) {
	var parserSI = input.split('?')[0];
	let result = parserSI.match(/(album|track|tracks|playlist)\/(.*)/g);
	return /(album)/g.test(input) ? {id: result.join("").split("/")[1], type: 'album'}
			: /(track|tracks)/g.test(input) ? {id: result.join("").split("/")[1], type: 'track'} 
			: /(playlist)/g.test(input) ? {id: result.join("").split("/")[1], type: 'playlist'} 
			: null;
}

// Authenticate and get access token
async function setCredentials(_callback) {
	s.clientCredentialsGrant()
	.then(function(data) {
		rspData = data; // For future
		// Save the access token so that it's used in future calls
		s.setAccessToken(data.body['access_token']);
		_callback();
	}, function(err) {
		console.log('Something went wrong when retrieving an access token', err.message);
	})
};

// Get features from track
async function getTrackFeatures(id, _callback) {
	setCredentials(() => {
		s.getAudioFeaturesForTrack(id).then(function(data) {
				// console.log(data.body.energy);
				_callback(data.body);
			}, function(err) {
				console.log("Track feature error", err);
		});
	});
}

// Visible to other js
module.exports.api = (userInput, _callback) => {
	let mediaURI = parseInput(userInput);
	setCredentials(() => {
		console.log("Access token is " + rspData.body['access_token']);
		
		// Something bad happened
		if(!mediaURI) {
			_callback(null, 'invalid_url');
		}
		
		// URI is album
		if(mediaURI.type === "album") {
			s.getAlbumTracks(mediaURI.id).then(
				function(data) {

					// Get ids of all tracks in album
					let tracks = data.body.items.map(val => val.id);

					s.getAudioFeaturesForTracks(tracks).then(function(data) {
						let audioFeatures = data.body.audio_features;
						s.getTracks(tracks).then(function(nameReq) {
							_callback({
								type: 'album',
								trackInfo: nameReq.body.tracks,
								audioFeatures: audioFeatures
							});
						});
					});
					
				}, function(err) {
					_callback(null, 'api_error');
					console.log('Something went wrong!', err);
				});
		}

		// URI is track
		if(mediaURI.type === "track") {
			console.log("track");
			
			getTrackFeatures(mediaURI.id, (audioFeatures) => {
				s.getTrack(mediaURI.id).then(
					function(nameReq) {
/* 						console.log(nameReq.body.album.name);
						console.log(nameReq.body.album.artists);
						console.log(nameReq.body.name); */
						_callback({
							type: 'track',
							trackInfo: nameReq.body,
							audioFeatures: audioFeatures
						});
					}, function(err) {
						_callback(null, 'api_error');
						console.log('Something went wrong!', err);
				});	
			});
		}
		
		if(mediaURI.type === 'playlist') {
			s.getPlaylistTracks(mediaURI.id).then(function(data) {
				let tracks = data.body.items.map(val => val.track.id);
				
				s.getAudioFeaturesForTracks(tracks).then(function(audioFeatures) {
					s.getTracks(tracks).then(function(trackInfo) {
						s.getPlaylist(mediaURI.id).then(function(info) {
							_callback({
								type: 'playlist',
								playlistInfo: info.body,
								trackInfo: trackInfo.body,
								audioFeatures: audioFeatures.body
							});
						}).catch((err) => {
							_callback(null, 'api_error');
							console.log('Something went wrong!', err);
						});
					}).catch((err) => {
						_callback(null, 'api_error');
						console.log('Something went wrong!', err);
					});
					
				}, function(err) {
					_callback(null, 'api_error');
					console.log('Something went wrong!', err);
			});
				
			}).catch((err) => {
				_callback(null, 'api_error');
				console.log('Something went wrong!', err);
			});
		};
	})};
