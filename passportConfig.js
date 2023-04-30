const passport = require('passport');

require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports.passportInitialize = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        // passReqToCallback: true
    },
        async function (accessToken, refreshToken, profile, done) {
            try {
                // console.log(profile);
                // console.log(`From passportInitialize:${profile}\n\n${accessToken}\n\n${refreshToken}\n`);
                // const user = await User.findOrCreate({ googleId: profile.id });
                // if(!user)  return done(err, user);
                // if (!user) return done(null, false);
                // if (user.password !== password) return done(null, false);
                return done(null, profile);
            }
            catch (error) {
                return done(err, false);
            }
        }))
};

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});