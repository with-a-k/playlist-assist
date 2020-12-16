var express = require('express');
var router = express.Router();

function confirmUser(req, res, next) {
  if (req.session.user_id) {
    next();
  } else {
    res.redirect('/');
  }
}

router.get('/', confirmUser, getTrackAnalysis,
  function(req, res, next) {
    res.render('analysis', {
      title: 'Playlist Assist',
      user_id: req.session.user_id,
      access_token: req.session.access_token,
      refresh_token: req.session.refresh_token,
      trackData: []
    });
  }
);

module.exports = router;
