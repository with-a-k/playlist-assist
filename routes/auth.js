var express = require('express');
var router = express.Router();
const relay = require('../scripts/spotifyRelay');

router.get('/', (req, res, next) => res.redirect('/'));

router.get('/error', (req, res, next) => res.send('Unknown Error'));

router.get('/spotify', function(req, res, next) {
  relay.getAuthorizationCode(req, res, next)
});

router.get('/spotify/callback', function(req, res, next) {
  console.log(req.url);
});

module.exports = router;
