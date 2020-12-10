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
  userIndex = database.findOrCreateUser(profile.id);
  database.updateUserTokens(userIndex, accessToken, refreshToken);
  return done(null, profile);
}
));
