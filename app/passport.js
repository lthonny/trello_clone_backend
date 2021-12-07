const { User } = require('../app/models/index');
const passport = require('passport');
const googleService = require('../app/services/auth/google.service');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACKURL,
  },
  async function(accessToken, refreshToken, profile, done) {
    const dbUser = await User.findOne({ where: { email: profile.emails[0].value } });

    if(dbUser) {
      const user = await googleService.sign_in(profile.emails[0].value);
      done(null, user);
    } else {
      const user = await googleService.sign_up(profile.displayName, profile.emails[0].value);
      done(null, user);
    }
  },
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
