const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/spotify/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));
