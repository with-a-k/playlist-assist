var express = require('express');
var router = express.Router();
const database = require('../scripts/database');

router.get('/', function(req, res, next) {
  res.render('loadPlaylist', {
    title: 'Playlist Assist',
    user: 'ToFind',
    access_token: req.session.access_token,
    refresh_token: req.session.refresh_token
  });
});

module.exports = router;
