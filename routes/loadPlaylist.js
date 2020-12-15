var express = require('express');
var router = express.Router();
const database = require('../scripts/database');

router.get('/', function(req, res, next) {
  res.render('loadPlaylist', {
    title: 'Playlist Assist',
    user: 'ToFind',
    tokens: 'Maybe not needed'
  });
});

module.exports = router;
