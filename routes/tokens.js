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
  database.retrieveUserTokens(req.session.passport.user.id)
  .then(tokens) {
    req.session.tokens = tokens;
    next();
  }
}

router.get('/', checkAuthentication,
  addTokensToSession,
  function(req, res, next) {
    res.redirect('/loadPlaylist');
  }
);

module.exports = router;
