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
    let tracksData = req.session.tracksData.map(function (track, index) {
      return {
        id: track.id,
        trackName: track.trackName,
        artistList: track.artistList,
        albumName: track.albumName,
        energy: req.session.tracksFeatures[index].energy,
        danceability: req.session.tracksFeatures[index].danceability,
        valence: req.session.tracksFeatures[index].valence
      }
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
