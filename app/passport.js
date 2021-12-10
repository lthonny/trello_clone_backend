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
    async function (accessToken, refreshToken, profile, done) {
      // console.log(accessToken, refreshToken, profile);
      console.log(profile);

      const user = {
        name: profile.displayName,
        emails: profile.emails[0].value,
      };

      done(null, user);
    },
  ),
);

passport.serializeUser(async (user, done) => {
  console.log('serializeUser', user);

  const dbUser = await User.findOne({ where: { email: user.emails } });

  let profile;
  if (dbUser) {
    profile = await userService.sign_in(dbUser.email, 'google');
    console.log('user существует в базе данных', profile);
    done(null, profile);
  } else {
    profile = await userService.sign_up(
      user.name,
      user.emails,
      'google',
      'google',
    );
    console.log('user не существует в базе данных', profile);
    done(null, profile);
  }
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
