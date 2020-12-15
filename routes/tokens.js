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
    console.log(err);
    console.log(tokens);
    req.session.tokens = tokens;
    next();
  });
}

router.get('/', checkAuthentication,
  addTokensToSession,
  function(req, res, next) {
    console.log(req.session.tokens);
    res.redirect('/loadPlaylist');
  }
);

module.exports = router;
