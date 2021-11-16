// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy,
//   ExtractJwt = require('passport-jwt').ExtractJwt;
//
// const passport = require('passport');
// const { User, RefreshToken } = require('./models/index');
// const tokenService = require('./services/tokenService');
// const path = require('path');
// const fs = require('fs');
//
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.CALLBACKURL,
//     },
//     async function(accessToken, refreshToken, profile, done) {
//       try {
//         // console.log('accessToken', accessToken);
//         // console.log('refreshToken', refreshToken);
//
//         const user = await User.findOne({
//           where: {
//             email: profile.emails[0].value,
//             name: profile.displayName,
//             auth_via: 'google',
//           },
//         });
//
//         if (user) {
//           console.log('user существует');
//           done(null, user);
//         } else {
//           console.log('создание нового пользователя');
//           console.log('req', refreshToken);
//
//           const newUser = await User.create({
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             password: 'killmenot',
//             auth_via: 'google',
//           });
//
//           const user = await User.findOne({
//               where: { email: profile.emails[0].value },
//             });
//
//           const tokens = tokenService.generateTokens({ ...user });
//           await tokenService.saveToken(user.id, tokens.refreshToken);
//
//           done(null, { user: user, tokens: tokens });
//         }
//       } catch (error) {
//         console.log('error GoogleStrategy', error);
//       }
//       // done(null, profile);
//     },
//   ),
// );
//
// // const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
// // const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
//
// // const options = {
// //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// //   secretOrKey: PUB_KEY,
// //   algorithms: ['RS256'],
// // };
//
// // const opts = {}
// // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// // opts.secretOrKey = 'secret';
// // opts.issuer = 'accounts.examplesoft.com';
// // opts.audience = 'yoursite.net';
// // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
// //   User.findOne({id: jwt_payload.sub}, function(err, user) {
// //     if (err) {
// //       return done(err, false);
// //     }
// //     if (user) {
// //       return done(null, user);
// //     } else {
// //       return done(null, false);
// //       // or you could create a new account
// //     }
// //   });
// // }));
//
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
//
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });
//
// module.exports = (passport) => {}