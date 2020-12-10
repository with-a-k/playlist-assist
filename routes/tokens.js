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
    console.log('Retrieving tokens...');
    req.session.tokens = database.retrieveUserTokens(req.session.passport.user.id);
    res.redirect('loadPlaylist');
  }
);

module.exports = router;
