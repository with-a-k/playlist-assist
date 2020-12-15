var express = require('express');
var router = express.Router();
const axios = require('axios');
const querystring = require('querystring');

router.get('/', (req, res, next) => res.redirect('/'));

router.get('/error', (req, res, next) => res.send('Unknown Error'));

router.get('/spotify', function(req, res, next) {
  axios.get('https://accounts.spotify.com/authorize/',
    querystring.stringify({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri: 'https://immense-coast-83178.herokuapp.com/auth/spotify/callback',
      state: 'arbitrary',
      scope: 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private',
    }));
});

router.get('/spotify/callback', (req, res, next) => res.send('Logged in?'););

module.exports = router;
