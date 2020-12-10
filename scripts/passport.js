const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const database = require('./database');

var session = require('express-session');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: "https://immense-coast-83178.herokuapp.com/auth/spotify/callback"
},
function(accessToken, refreshToken, profile, done) {
  database.findOrCreateUser(profile.id);
  return done(null, profile);
}
));
