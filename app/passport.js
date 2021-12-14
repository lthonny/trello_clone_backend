const { User } = require('../app/models/index');
const passport = require('passport');
const userService = require('../app/services/auth/userServices');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
    },
    async function(accessToken, refreshToken, profile, done) {
      const user = {
        name: profile.displayName,
        email: profile.emails[0].value,
      };

      done(null, user);
    },
  ),
);

passport.serializeUser(async (user, done) => {
  try {
    const dbUser = await User.findOne({ where: { email: user.email } });

    let profile;
    if (dbUser) {
      profile = await userService.sign_in(dbUser.email, 'google');
      done(null, profile);
    } else {
      profile = await userService.sign_up(
        user.name,
        user.email,
        'google',
        'google',
      );
      done(null, profile);
    }
  } catch (e) {
    console.log('ddddddddddddddddddddddddddddddasssssssssssssssssssssDDDDDDDDDDD');
  }
});

passport.deserializeUser((user, done) => {
  done(null, user);
});