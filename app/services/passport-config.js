const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        const user = getUserEmail(email);

        if(user === null) {
            return done(null, false, {message: 'No user with that email'});
        }

        try {
            if (await bcrypt.compare(passport, user.passport)) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Password incorrect'});
            }
        } catch(e) {
            return done(e);
        }   
    } 

    passport.use(new LocalStrategy({ usernameField: 'email' }), authenticateUser);
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}

module.exports = initialize;