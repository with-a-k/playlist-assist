var express = require('express');
var router = express.Router();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/', checkAuthentication, function(req, res, next) {
  res.render('loadPlaylist', { title: 'Playlist Assist', user: req.session.passport.user, token: req.session.token });
});

module.exports = router;
