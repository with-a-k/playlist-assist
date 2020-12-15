var express = require('express');
var router = express.Router();
const database = require('../scripts/database');

function confirmUser(req, res, next) {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/', confirmUser, function(req, res, next) {
  console.log(req.session);
  res.render('loadPlaylist', {
    title: 'Playlist Assist',
    user_id: req.session.user_id,
    access_token: req.session.access_token,
    refresh_token: req.session.refresh_token
  });
});

module.exports = router;
