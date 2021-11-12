const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { User, RefreshToken } = require('./models/index');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
    },
    async function(accessToken, refreshToken, profile, done) {
      // try {
        // const user = await User.findOne({
        //   where: {
        //     email: profile.emails[0].value,
        //     name: profile.displayName,
        //     auth_via: 'google'
        //   },
        // });
        //
        // if (user) {
        //   console.log('user существует');
        //   done(null, user);
        // } else {
        //   console.log('создание нового пользователя');
        //
        //   const newUser = await User.create({
        //     name: profile.displayName,
        //     email: profile.emails[0].value,
        //     password: 'killmenot',
        //     auth_via: 'google',
        //   });
        //
        //   const user = await User.findOne({
        //     where: { email: profile.emails[0].value },
        //   });

          // console.log('refreshToken', refreshToken);

          // const refreshToken = await RefreshToken.create({
          //   refreshToken: refreshToken,
          //   user_id: user.id,
          // });

          // const tokenData = await RefreshToken.findOne({ where: { user_id: user.id } });

          // if (tokenData) {
          //   tokenData.refreshToken = refreshToken;
          //   return tokenData.save();
          // }
          //
          // const token = await RefreshToken.create({ refreshToken, user_id:  user.id});
          // return token;

          console.log('user', profile);
          done(null, profile);
      //   }
      // } catch (error) {
      //   console.log('error GoogleStrategy', error);
      // }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});