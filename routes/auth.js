var express = require('express');
var router = express.Router();
const relay = require('../scripts/spotifyRelay');

router.get('/', (req, res, next) => res.redirect('/'));

router.get('/error', (req, res, next) => res.send('Unknown Error'));

router.get('/spotify', function(req, res, next) {
  relay.getAuthorizationCode(req, res, next);
});

router.get('/spotify/callback', async function(req, res, next) {
  if (req.query.state === 'arbitrary') {
    tokens = await relay.getAccessToken(req, res, next);
    req.session.access_token = tokens.access_token;
    req.session.refresh_token = tokens.refresh_token;
    console.log(req.session);
  } else {
    console.log('State mismatch, got state ' + req.query.state);
    res.redirect('/');
  }
}), function (req, res, next) {
  res.redirect('/loadPlaylist');
};

module.exports = router;
