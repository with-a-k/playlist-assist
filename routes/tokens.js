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
  database.retrieveUserTokens(req.session.passport.user.id)
  .then((tokens) => {
    console.log('We got ' + tokens);
    req.session.tokens = tokens;
    console.log('State of the Session:');
    console.log(req.session);
    next();
  });
}

router.get('/', checkAuthentication,
  addTokensToSession,
  function(req, res, next) {
    res.redirect('/loadPlaylist');
  }
);

module.exports = router;
