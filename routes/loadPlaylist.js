var express = require('express');
var router = express.Router();
const database = require('../scripts/database');

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/', checkAuthentication,
  function(req, res, next) {
    req.session.tokens = database.retrieveUserTokens(req.session.passport.user.id);
  },
  function(req, res, next) {
  res.render('loadPlaylist', {
    title: 'Playlist Assist',
    user: req.session.passport.user,
    tokens: req.session.access
  });
});

module.exports = router;
