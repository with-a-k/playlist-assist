var express = require('express');
var router = express.Router();
const relay = require('../scripts/spotifyRelay');

function confirmUser(req, res, next) {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/', confirmUser, function(req, res, next) {
    console.log(req.session.tracksData)
    let tracksData = req.session.tracksData.forEach(function (track, index) {
      track.energy = req.session.tracksFeatures.energy;
      track.danceability = req.session.tracksFeatures.danceability;
      track.valence = req.session.tracksFeatures.valence;
    });
    res.render('analysis', {
      title: 'Playlist Assist',
      user_id: req.session.user_id,
      access_token: req.session.access_token,
      refresh_token: req.session.refresh_token,
      tracksData: tracksData
    });
  }
);

module.exports = router;
