var express = require('express');
var router = express.Router();
const relay = require('../scripts/spotifyRelay');

router.get('/', (req, res, next) => res.redirect('/'));

router.get('/playlist/:playlistId', relay.getTracksFromPlaylist,
  function(req, res, next) {
    res.send();
  }
);

router.get('/analysis', relay.getTrackAnalysis,
  function(req, res, next) {
    res.send();
  }
);

module.exports = router;
