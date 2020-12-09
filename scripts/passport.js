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
  callbackURL: "/auth/spotify/callback"
},
function(accessToken, refreshToken, profile, done) {
  database.findOrCreateUser(profile.user_id, null);
  return done(null, profile);
}
));
