const SpotifyWebApi = require('spotify-web-api-node');

const scopes = ['playlist-read-private', 'playlist-read-collaborative',
  'playlist-modify-public', 'playlist-modify-private'],
  redirectUri = "https://immense-coast-83178.herokuapp.com/auth/spotify/callback",
  clientId = process.env.SPOTIFY_CLIENT_ID,
  clientSecret = process.env.SPOTIFY_CLIENT_SECRET,
  state = 'arbitrary';

const spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
  clientSecret: clientSecret
});

const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

function getAuthorizationCode(req, res, next) {
  res.redirect(authorizeURL);
}

function getAccessToken(req, res, next) {
  spotifyApi.authorizationCodeGrant(req.query.code).then(function (data) {
    console.log('Code expires in: ' + data.body['expires_in']);
    spotifyApi.setAccessToken(data.body['access_token']);
    spotifyApi.setRefreshToken(data.body['refresh_token']);
    req.session.access_token = data.body['access_token'];
    req.session.refresh_token = data.body['refresh_token'];
    next();
  },
  function(error) {
    console.log('Authorization error', error);
  });
}

function refreshAccessToken() {

}

function getProfile(req, res, next) {
  spotifyApi.getMe().then(function(data) {
    req.session.user_id = data.body.id;
    next();
  }),
  function(error) {
    console.log('Profile retrieve error', error);
  };
}

function getTracksFromPlaylist(req, res, next) {
  spotifyApi.getPlaylistTracks(req.params.playlistId, {
    offset: 1
  }).then(
    function(data) {
      res.send(data.body.items);
    }
  )
}

function getTrackAnalysis(req, res, next) {
  let trackData = req.query.tracksData;
  let trackIds = trackData.map(track => track.id);
  console.log('In getTrackAnalysis');
  spotifyApi.getAudioFeaturesForTracks(trackIds).then(function(data) {
    req.session.tracksFeatures = data.body.audio_features;
    req.session.tracksData = trackData;
    res.send(data);
  });
}

module.exports = {
  getAuthorizationCode,
  getAccessToken,
  refreshAccessToken,
  getProfile,
  getTracksFromPlaylist,
  getTrackAnalysis
};
