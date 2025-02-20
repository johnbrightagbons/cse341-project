const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
        },
        function (accessToken, refreshToken, profile, done) {
            // Store tokens in the profile object for future use
            profile.accessToken = accessToken;
            profile.refreshToken = refreshToken;
            //User.findOrCreate({githubId: profile.id}, function(err, user) {
            return done(null, profile);
            // });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


module.exports = passport;
