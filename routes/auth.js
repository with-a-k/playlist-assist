var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/auth', (req, res) => res.redirect('/'));

router.get('/auth/error', (req, res) => res.send('Unknown Error'));

router.get('/auth/spotify', passport.authenticate('spotify'));

router.get('/auth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
function(req, res) {
  res.redirect('/');
});

module.exports = router;
