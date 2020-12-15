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

function addTokensToSession(req, res, next) {
  console.log('Beginning of addTokensToSession middleware');
  database.retrieveUserTokens(req.session.passport.user.id, function(err, tokens) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(tokens);
      req.session.tokens = tokens;
      next();
    }
  });
}

router.get('/', checkAuthentication,
  addTokensToSession,
  function(req, res, next) {
  res.render('loadPlaylist', {
    title: 'Playlist Assist',
    user: req.session.passport.user,
    tokens: req.session.tokens
  });
});

module.exports = router;
