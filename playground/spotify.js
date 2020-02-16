const secrets = require('../app');
const Spotify = require('spotify-web-api-node');
const btoa = require('btoa');

const s = new Spotify({
  clientId: secrets.clientID,
  clientSecret: secrets.clientSecret,
  redirectUri: secrets.redirectURI
});

console.log(btoa(secrets.clientID + ':' + secrets.clientSecret));
console.log(s.setAccessToken(btoa(secrets.clientID + ':' + secrets.clientSecret)));