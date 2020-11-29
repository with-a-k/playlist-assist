var express = require('express');
var router = express.Router();

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next;
  }
  res.redirect('/');
}

router.get('/', checkAuthentication, function(req, res, next) {
  res.render('loadPlaylist', { title: 'Playlist Assist', user: req.session.passport.user });
});

module.exports = router;
