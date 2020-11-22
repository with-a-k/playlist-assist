var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => res.redirect('/'));

router.get('/error', (req, res, next) => res.send('Unknown Error'));

router.get('/spotify', passport.authenticate('spotify'));

router.get('/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
function(req, res) {
  res.redirect('/');
});

module.exports = router;
