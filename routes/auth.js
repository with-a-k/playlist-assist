var express = require('express');
var router = express.Router();
const relay = require('../scripts/spotifyRelay');

router.get('/', (req, res, next) => res.redirect('/'));

router.get('/error', (req, res, next) => res.send('Unknown Error'));

router.get('/spotify', function(req, res, next) {
  relay.getAuthorizationCode(req, res, next)
});

router.get('/spotify/callback', function(req, res, next) {
  if (req.params.state === 'arbitrary') {
    relay.getAccessToken(code);
  } else {
    console.log('State mismatch, got state ' + req.params.state);
    res.redirect('/');
  }
});

module.exports = router;
