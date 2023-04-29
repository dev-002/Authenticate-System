const GoogleStrategy = require('passport-google-oauth20').Strategy;

function passportInitialize(passport) {
    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback"
    }),
        async function (accessToken, refreshToken, profile, done) {
            try {
                const user = await User.findOrCreate({ googleId: profile.id });
                // if(!user)  return done(err, user);
                if (!user) return done(null, false);
                if (user.password !== password) return done(null, false);
                return done(null, user);
            }
            catch (error) {
                return done(err, false);
            }
        })
};

module.exports = passportInitialize;