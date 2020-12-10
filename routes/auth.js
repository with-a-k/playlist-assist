var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => res.redirect('/'));

router.get('/error', (req, res, next) => res.send('Unknown Error'));

router.get('/spotify', passport.authenticate('spotify'));

router.get('/spotify/callback', passport.authenticate('spotify',
  {
    scope: ['playlist-read-private', 'playlist-read-collaborative',
      'playlist-modify-public', 'playlist-modify-private'],
    failureRedirect: '/auth/error'
  }),
function(req, res) {
  res.redirect('/tokens');
});

module.exports = router;
