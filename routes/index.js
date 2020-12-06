var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Rendering index.');
  res.render('index', { title: 'Playlist Assist' });
});

module.exports = router;
